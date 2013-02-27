var fs = require('fs');
var User = require('../resources/user/user.js');
var launch = require('../views/launch.js');

var index = exports.index = function (req, res) {
    var data = (typeof req.session.user === 'undefined') ? launch.signedOut() : launch.signedIn();
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
};



var signIn = function(req, res) {
    User.authenticate(req.body.username, req.body.password, function(err, user) {
	if (err) {
            res.writeHead(404);
            res.end();
            return;
	};
	if (user) {
	    req.session.user = user.name;
	    res.writeHead(303, {'location': '/'});
	    res.end();
	    return;
	};
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('No such user!');
    }, function(err) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Wrong Password!');
    });
    
};

exports.form = function(req, res) {
    signIn(req, res);
};

exports.submit = function(req, res) {

};

