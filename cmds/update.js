var fs = require('fs')
, shell = require('shelljs')
, path = require('path');

var importfile = '/Users/evonbuelow/Projects/Email/demo/public';

var update = module.exports = function update() {
  shell.cp('-Rf', importfile + '/*', path.dirname(__dirname) + '/static');
  shell.cp('-f', path.dirname(__dirname) + '/static/index.html', path.dirname(__dirname) + '/static/userHome.html');
  shell.rm(path.dirname(__dirname) + '/static/index.html');
  
  console.log('files updated');
  process.exit(0);
};
