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

	router.get('/', function (req, res) {
		Parse.initialize("***REMOVED***", "***REMOVED***");

		var searchText = req.query.sSearch;
        var displayLength = req.query.iDisplayLength;
        displayStart = req.query.iDisplayStart;
        echo = req.query.sEcho;
		if (searchText != null && searchText != "") {}

		var Credit = Parse.Object.extend("Credit");
		var countQuery = new Parse.Query(Credit);

		countQuery.count({
			success : function (count){                
                var tableDataQuery = new Parse.Query(Credit);
				
                tableDataQuery.descending("name");
				tableDataQuery.limit(parseInt(displayLength));
                
                if(parseInt(displayStart) != 0)
                    tableDataQuery.skip(parseInt(displayStart));
                    
				tableDataQuery.find({
					success : function (credits) {
						var data = [];
                        
						for (var i = 0; i < credits.length; i++) {
							var credit = credits[i];
                            var creditName = "";
                            
                            if(credit.get("name") !== null && credit.get("name") !== undefined)
                                creditName = credit.get("name");
                                    
							data[i] = {                            
								name : creditName,
								DT_RowId : credit.id
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
			},
			error : function (error) {
				// The request failed
			}
		});
	});

router.get('/edit', urlencodedParser, function (req, res) {
	Parse.initialize("***REMOVED***", "***REMOVED***");
    var Credit = Parse.Object.extend("Credit");
	var credit = new Credit();
    
    credit.id = req.query["creditEditId"];
    credit.set("name", req.query["creditNameEdit"]);
    
	credit.save(null, {
		success : function (credit) {
			res.json("Credit Saved!");
		},
		error : function (credit, error) {
			res.json("Credit Save Error!");
		}
	});
});

router.post('/add', urlencodedParser, function (req, res) {
	Parse.initialize("***REMOVED***", "***REMOVED***");

	var Credit = Parse.Object.extend("Credit");
	var credit = new Credit();

	credit.set("name", req.body.creditNameAdd);

	credit.save(null, {
		success : function (credit) {
			res.json("Credit Saved!");
		},
		error : function (credit, error) {
			res.json("Credit Save Error!");
		}
	});
});

router.post('/delete', urlencodedParser, function (req, res) {
	Parse.initialize("***REMOVED***", "***REMOVED***");

	var Credit = Parse.Object.extend("Credit");
	var query = new Parse.Query(Credit);

	var creditID = req.body.id;

	query.get(creditID, {
		success : function (myObj) {
			myObj.destroy({});
            
			res.end();
		},
		error : function (object, error) {
			res.json("Credit Deletion Error: " + error);
		}
	});
});

module.exports = router;
