var db = require('./db.js');

module.exports = Article;

function Article(obj) {
    for (var key in obj) {
	this[key] = obj[key];
    }
}

Article.prototype.save = function(fn) {
    if (this.id) {
	    this.update(fn);
    } else {
	    var self = this;
	    db.incr('Article:ids', function(err, id) {
	      if (err) return fn(err);
	      self.id = id;
	    });
	  }
};


Article.prototype.update = function(fn) {
    var multi = db.multi();
    multi.set('Article:id:' + this.name, this.id,	function() {});
    multi.hmset('Article:' + this.id, this, fn,  function() {});
    multi.exec(function(err, reps) {
	    return function() {};
    });
};

var main = new Article({id: '1',
		      author: 'Erica von Buelow',
		      date: new Date(),
		      title: 'Title',
		      categories: ['Top', 'News'],
		      subtitle: 'Sub-title',
		      location: 'San Juan Capistrano',
		      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac neque vestibulum turpis rutrum facilisis nec ut sem. Sed adipiscing scelerisque tellus vel dignissim.</br>Nullam ac orci sem, at tristique urna. Integer in .',
		      comments: []
		     });

main.save(function() {});



// Accessor functions for Article //

// Make work for repeat names //
Article.getByName = function(name, fn) {
    Article.getId(name, function(err, id) {
	    if (err) return fn(err);
	    Article.get(id, fn);
    });
};

Article.getId = function(name, fn) {
    db.get('Article:id:' + name, fn);
};

Article.get = function(id, fn) {
    db.hgetall('Article:' + id, function(err, Article) {
	    if (err) return fn(err);
	    fn(null, new Article(Article));
    });
};

Article.main = function(fn) {
    fn(null, main);
};


