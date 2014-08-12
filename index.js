var defaultPort = 4000;


var fs = require('fs');
var packageJson = require('./package.json');
var config = require('./config');
var pty = require('pty.js');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var CBuffer = require('CBuffer');
var portfinder = require('portfinder');

var argv = require('minimist')(process.argv.slice(2),{
    stopEarly: true,
    alias: {
        'p': 'port',
        'b': 'buffer',
        'c': 'cols',
        'r': 'rows',
        'h': 'help',
        'v': 'version'
    },
    default: {
        'port': config.defaultPort,
        'rows': config.defaultRows,
        'cols': config.defaultCols,
        'buffer': config.defaultBuffer
    },
    boolean: ['help']
});

if (argv.help) {
    fs.readFile('./help.txt', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        process.exit(0);
    });
}
else if (argv.version) {
    console.log(packageJson.version);
    process.exit(0);
}
else {

    var catchupBuffer = new CBuffer(argv.buffer);

    console.log(argv.cols);

    portfinder.basePort = argv.port;
    portfinder.getPort(function (err,port) {
        app.use(express.static(__dirname + '/public'));
        
        var term = pty.spawn(argv._[0], argv._.slice(1), {
            name: 'xterm-color',
            cols: argv.cols,
            rows: argv.rows,
            //cwd: process.env.HOME,
            //env: process.env
        });

        term.on('data', function(data) {
            io.emit('consoleUpdate', data);
            catchupBuffer.push(data);
        });
        
        io.on('connection', function(socket){
            io.emit('catchup',catchupBuffer.toArray());
            term.redraw();
        });

        http.listen(argv.port, function(){
            console.log('listening on port ' + argv.port);
        });
    });

}
