var Plates = require('plates')
    , fs = require('fs');

var html = fs.readFileSync('./static/html/temphomepage.html', 'utf8');

var data1 = {
  'log': '<a href="/#login">Log in</a>'
};
var data2 = {
  'log': '<a href="/logout">Log out</a>'
};

var map = Plates.Map();

map.class('reg').remove();
map.where('id').is('log').use('log');

exports.signedOut = function() {
  return Plates.bind(html, data1);
}
exports.signedIn = function() {
  return Plates.bind(html, data2, map);
};