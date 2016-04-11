var express = require('express');
var Parse = require('parse/node').Parse;
var bodyParser = require('body-parser');
var router = express.Router();
var displayStart = 0;
var echo = 0;
module.exports = router;
Parse.initialize(process.env.ParseApplicationID, process.env.ParseJavascriptID);

var urlencodedParser = bodyParser.urlencoded({
		extended : false
	});

router.get('/', function (req, res) {
	var searchText = req.query.sSearch;
	displayStart = req.query.iDisplayStart;
	var displayLength = req.query.iDisplayLength;
	echo = req.query.sEcho;

	if (searchText != null && searchText != "") {}

	var userId = req.query["userId"];

	if (userId == undefined || userId == null || userId == "") {
        var User = Parse.Object.extend("User");
        var countQuery = new Parse.Query(User);
        
		countQuery.count().then(function (count) {
			var tableDataQuery = new Parse.Query(User);

			tableDataQuery.descending("username");
			tableDataQuery.limit(parseInt(displayLength));

			if (parseInt(displayStart) != 0)
				tableDataQuery.skip(parseInt(displayStart));

			tableDataQuery.find({
				success : function (users) {
					var data = [];
					for (var
						i = 0; i < users.length; i++) {
						var user = users[i];
						var userName = '';
						var email = '';

						if (user.get("username") !== null && user.get("username") !== undefined) {
							userName = user.get("username");
						}

						if (user.get("email") !== null && user.get("email") !== undefined)
							email = user.get("email");

						data[i] = {
							userName : userName,
							email : email,
							DT_RowId : user.id
						};
					}

					res.json({
						aaData : data,
						iTotalRecords : count,
						iTotalDisplayRecords : count,
						sEcho : echo
					});
				}
			});
		})
	} else {
		var User = Parse.Object.extend("User");
		var userQuery = new Parse.Query(User);

		userQuery.get(userId, {
			success : function (user) {
				var userName = '';
				var email = '';

				if (user.get("username") !== null && user.get("username") !== undefined) {
                    userName = user.get("username");
				}

				if (user.get("email") !== null && user.get("email") !== undefined)
					email = user.get("email");

				res.json({
					"userId" : userId,
					"userName" : userName,
					"email" : email,
					sEcho : echo
				});
			},
			error : function (error) {
				// The request failed
			}
		});
	}
});

router.get('/edit', urlencodedParser, function (req, res) {
	var User = Parse.Object.extend("User");
	var user = new User();

	user.id = req.query["userEditId"];
	user.set("username", req.query["userNameEdit"]);
	user.set("email", req.query["emailEdit"]);

	user.save(null, {
		success : function (results) {
			res.json("User Saved!");
		},
		error : function (results, error) {
			res.json("User Save Error!");
		}
	});
});

router.post('/add', urlencodedParser, function (req, res) {
	var User = Parse.Object.extend("User");
	var user = new User();

	user.set("username", req.body.userName);
	user.set("email", req.body.email);
    user.set("password", req.body.password);
    
	user.save(null, {
		success : function (user) {
			res.json("User Saved!");
		},
		error : function (user, error) {
			res.json("User Save Error!");
		}
	});
});

router.post('/delete', urlencodedParser, function (req, res) {
	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);

	var userID = req.body.id;

	query.get(userID, {
		success : function (myObj) {
			myObj.destroy({});

			res.end();
		},
		error : function (object, error) {
			res.json("User Deletion Error: " + error);
		}
	});
});

module.exports = router;
