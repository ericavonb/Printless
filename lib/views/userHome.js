var Plates = require('plates');
var fs = require('fs');

var html = fs.readFileSync('./static/html/homepage.html', 'utf8');



module.exports = function userHome(user) {
    var map = Plates.Map();
    map.class('username').to('name');
    var data = {'name': user};
    return html = Plates.bind(html, data, map);
};
