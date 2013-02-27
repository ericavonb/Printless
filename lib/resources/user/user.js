var bcrypt = require('bcrypt')
, db = require('../db.js')
, article = require('../article.js');
//var  db = redis.createClient();

//redis.debug_mode = true;

//db.on("error", function (err) {
//        console.log(err);
//    });
    
/*db.on("connect", function () {    
  db.set('user:id:' + 'user1', '0',  function() {});
  db.hmset('user:' + '0','name', 'user1', 'id', '0');
  db.set('user:id:' + 'user2', '1',  function() {});
  db.hmset('user:' + '1', 'name', 'user2', 'id', '1');
});*/
    

module.exports = User;

function User(obj) {
    for (var key in obj) {
	this[key] = obj[key];
    }
}

User.prototype.save = function(fn) {
    if (this.id) {
	    this.update(fn);
    } else {
	    var self = this;
	    db.incr('user:ids', function(err, id) {
	      if (err) return fn(err);
	      self.id = id;
	      self.hashPassword(function(err) {
		      if (err) return fn(err);
		      self.update(fn);
	      });
	    });
	  }
};


User.prototype.update = function(fn) {
    var multi = db.multi();
    multi.set('user:id:' + this.name, this.id,  function() {});
    multi.hmset('user:' + this.id, this, fn,  function() {});
    multi.exec(function(err, reps) {
	    return function() {};
    });
};

User.prototype.hashPassword = function(fn) {
    var self = this;
    bcrypt.genSalt(12, function(err, salt) {
	    if (err) return fn(err);
	    self.salt = salt;
	    bcrypt.hash(self.pass, salt, function(err, hash) {
	      self.pass = hash;
	      fn();
	    });
    });
};
var main;
var me;
article.main(function(err, b) {
    if (err) console.log('err');
    me = new User({name: 'Erica', pass: 'e', 'articles': String(b.id)});
    me.save(function() {});
});


// Accessor functions for user //
User.getByName = function(name, fn) {
    User.getId(name, function(err, id) {
	    if (err) return fn(err);
	    User.get(id, fn);
    });
};

User.getId = function(name, fn) {
    db.get('user:id:' + name, fn);
};

User.get = function(id, fn) {
    db.hgetall('user:' + id, function(err, user) {
	    if (err) return fn(err);
	    fn(null, new User(user));
    });
};

User.authenticate = function(name, pass, fn, err2) {
    if (!err2)
      err2 = fn;
    User.getByName(name, function(err, user) {
	    if (err) return fn(err);
	    if (!user.id) return fn();
	    bcrypt.compare(pass, user.pass, function(err, res) {
	      if (err) return err2(err);
	      if (res) return fn(null, user);
	      err2();
	    });
    });
};
