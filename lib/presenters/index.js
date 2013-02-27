var path = require('path')
, home = require('../presenters/home.js')
, userHome = require('../presenters/userHome.js')
, register = require('../presenters/register.js')
, help = require('../presenters/register.js')
, article = require('../presenters/article.js');


function signedIn(no, yes) {
  return function(args) {
    if (typeof this.req.session.user === 'undefined')
      no(this.req, this.res, args);
    else
      yes(this.req, this.res, args);
  };
};

function redirect(loc) {
  return function(req, res) {
    res.writeHead(302, {'location': loc});
    res.end();
  };
};


exports.home = {
    index: home.index,
    form: home.form
};


exports.userHome = {
    index: userHome.index,
    form: userHome.form
};


exports.register = {
    index: register.index,
    form: register.form
};


exports.help = {
    index: help.index,
    form: help.form
};

exports.article = {
    index: article.index,
    form: article.form
}

exports.logout = function(req, res) {
    if (req.session) {
	req.session.destroy(function(err) {
	    res.writeHead(404);
	    res.end();
	});
    };
    req.session = null;
    res.writeHead(302, { 'location': '/'});
    res.end();
};
