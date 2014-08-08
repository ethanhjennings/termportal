#Terminal Portal

This is a command line tool built using node.js which displays terminal output piped in from stdin on a read-only webpage that's also hosted by the same command. It's like the 'tee' command except it outputs to the web instead of to a file.

Terminal colors are supported!

## Installation

```bash
$ npm install termportal -g
```

This will install it globally. Leave off the `-g` if you only want to install locally.

## Usage

If you just want to display a command that runs for a short amount of time you can pipe it directly, for example:
```bash
$ echo "Hello world!" | termportal
```

If the command is longer running and you want to see output in realtime you need to un-buffer the pipe which can be done with stdbuf, for example:
```bash
$ stdbuf -oL -eL <your command> | termportal
```

To view the web output go to:
```
http://localhost:4000
```

Use the `-p` option if you want to use a different port.

## Issues
- No security!
- Commands like "top" that move the cursor stop displaying correctly after a while.

## Kudos

- clientside terminal display uses [term.js](https://github.com/chjj/term.js)
- loading animation is a modified version taken from [SpinKit](https://github.com/tobiasahlin/SpinKit)
