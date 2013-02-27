var fs = require('fs')
, shell = require('shelljs')
, path = require('path')
, readline = require('readline')
, App = require(path.dirname(__dirname) + '/app.js')
, cli_app = require(path.dirname(__dirname) + '/my_server.js')
, argv = cli_app.argv;


/* CLI Command to start the server. */

var rl;

var open = false;

var start = module.exports = function start (args) {
    if (!(typeof rl === 'undefined')) {
	rl.close();
    };
    rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
    });

    if (argv.u) {
	shell.cp('-Rf', '/Users/evonbuelow/Projects/Email/demo/public'
		 + '/*', path.dirname(__dirname) + '/static');
	shell.cp('-f', path.dirname(__dirname) 
		 + '/static/index.html', path.dirname(__dirname) 
		 + '/static/userHome.html');
	shell.rm(path.dirname(__dirname) + '/static/index.html');
	console.log('files updated');
    };

    var user = (typeof argv.l === 'undefined')? null : argv.l;
    var port = (typeof argv.p === 'undefined')? 8000 : argv.p;
    App.app(port, user);

    console.log('----------------------------------------');
    console.log('Type Help to get a list of commands\n');
    shell.exec("open /Applications/Google\\ Chrome.app 'http://localhost:" + port + "'");

    
    rl.prompt();
    rl.on('line', function(cmd) {
	if (cmd == 'help') {
	    console.log('`exit`: stop the server');
	    console.log('`refresh`: refresh the server');
	};
	if (cmd === 'exit') {
	    console.log('Goodbye!');
	    rl.close();
	    App.http_app.server.close();
	    process.exit(0);
	    
	};
	if (cmd === 'refresh') { // Not working yet.
	    console.log('refreshing......'); 
	    App.http_app.server.close();
            console.log('........................................');
	    start();
	};
	
	rl.prompt();
    });
    
};

