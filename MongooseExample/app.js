/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
	mongoose.connect ('getmenova-projectsrevamped-5925031'); //
	
	//('getmenova-projectsrevamped-5925031'); // need to fix this line for tomorrow! find location mongodbserver runs at
	//MongoDB starting : pid=8099 port=27017 dbpath=/data/db 64-bit host=getmenova-projectsrevamped-5925031
}
//load all files in models dir
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
	if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});
app.get('/users', function(req, res) {
	mongoose.model('users').find(function(err, users) {
		res.send(users);
	});
});
app.get('/posts/:userId', function(req, res) {
	mongoose.model('posts').find({
		user: req.params.userId
	}, function(err, posts) {
		mongoose.model('posts').populate(posts, {
			path: 'user'
		}, function(err, posts) {
			res.send(ok);
		});
	});
});
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});