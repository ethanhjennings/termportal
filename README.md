#Terminal Portal

This is a command line tool built using node.js which runs whatever it is given and hosts a webpage displaying the output.

## Installation

```bash
$ npm install termportal -g
```

This will install it globally. Leave off the `-g` if you only want to install locally.

## Usage

To display the command `top`:

```bash
$ termportal top
```

To view the web output go to:
```
http://localhost:4000
```

You can specify options before the command like this:

```bash
$ termportal --port 8000 top
```

## Options


## Features
-- terminal colors and cursor movement (like top uses) are supported.

## Issues
- No security!

## Kudos

- this project relies on [pty.js](https://github.com/chjj/pty.js) to run the command in its own shell and [term.js](https://github.com/chjj/pty.js) to display the terminal output clientside
- loading animation is a modified version taken from [SpinKit](https://github.com/tobiasahlin/SpinKit)
