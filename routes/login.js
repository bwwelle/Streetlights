var express = require('express');
var Parse = require('parse/node').Parse;
var bodyParser = require('body-parser');
var router = express.Router();
var displayStart = 0;
var echo = 0;
module.exports = router;
var app = express();
var path = require('path');
app.use(express.static(__dirname + '/public'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var urlencodedParser = bodyParser.urlencoded({
		extended : false
	})

	router.get('/', urlencodedParser, function (req, res) {
		Parse.initialize("***REMOVED***", "***REMOVED***");
		var User = Parse.Object.extend("User");
		var userQuery = new Parse.Query(User);

		userQuery.equalTo("username", 'bwwelle');
		userQuery.equalTo("password", '23!jordan');

		userQuery.find({
			success : function (user) {
				res.json('hello')
			},
			error : function (error) {
				res.json("no")
			}
		});
	});

module.exports = router;
