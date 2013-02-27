var fs = require('fs');
var view = require('../views/article.js');
var Article = require('../resources/Article.js');

var form = exports.form = function(req, res) {

};

var index = exports.index = function(req, res) {
    var data = view(req.session.user);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
};