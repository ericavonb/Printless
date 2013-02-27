var redis = require('redis');

//redis.debug_mode = true;


module.exports = db = redis.createClient();


db.on("error", function (err) {
        console.log(err);
    });
