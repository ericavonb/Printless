var flatiron = require('flatiron')
, cookieParser = require('connect').cookieParser
, session = require('connect').session
, static = require('connect').static
, path = require('path')
, director = require('director')
, qs = require('querystring')
, fs = require('fs')
, home = require(__dirname + '/lib/presenters/home.js')
, userHome = require(__dirname + '/lib/presenters/userHome.js')
, register = require(__dirname + '/lib/presenters/register.js')
, cli = require('flatiron-cli-config')
, u = require(__dirname + '/cmds/update.js');


var cli_app =  module.exports = flatiron.app;

cli_app.config.file({ file: path.join(__dirname, 'config', 'config.json') });


cli_app.use(flatiron.plugins.cli, {
    usage: [
	'`app update`: Update static files with Roots project files.',
	'`app start_server`: Start the http server.'
    ],
    source: path.join(__dirname, 'cmds'),
    argv: {
	login: {
	    alias: 'l',
	    description: 'Log in as a user.',
	    string: true
	},
	port: {
	    alias: 'p',
	    description: 'Run HTTP Server on this port.'
	},
	update: {
	    alias: 'u',
	    description: 'Update the files first',
	    boolean: true,
	    default: false
	}
    }
});

cli_app.start();

