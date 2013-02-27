var fs = require('fs');
var view = require('../views/userHome.js');
var User = require('../resources/user/user.js');

var form = exports.form = function(req, res) {

};

var index = exports.index = function(req, res) {
    var data = view(req.session.user);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
};
