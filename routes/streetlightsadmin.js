var express = require('express');
var Parse = require('parse/node').Parse;
var bodyParser = require('body-parser');
var router = express.Router();
var displayStart = 0;
var echo = 0;
module.exports = router;

var urlencodedParser = bodyParser.urlencoded({
		extended : false
	})

router.post('/', urlencodedParser, function (req, res) {
		Parse.initialize("***REMOVED***", "***REMOVED***");

		Parse.User.logIn('bwwelle', '23!jordan', {
			success : function (user) {
				res.json("Successfull Login");
			},
			error : function (user, err) {
				if (err) {
					res.json({
						message : err
					});
				}
			}
		});
	});

module.exports = router;
