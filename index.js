var program = require('commander');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var CBuffer = require('CBuffer');

var catchupBuffer = new CBuffer(10);
var updateBuffer = "";
var currentBuffer = catchupBuffer;

program
 	.version('0.0.1')
 	.option('-p, --port <port_number>', 'Port number')
 	.parse(process.argv);

var port = program.port || 1337;

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	io.emit('catchup',currentBuffer.toArray());
});

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data) {
    io.emit('consoleUpdate', data);

    currentBuffer.push(data);

    process.stdout.write(data);
});

http.listen(3000, function(){
 	console.log('listening on *:3000');
});

