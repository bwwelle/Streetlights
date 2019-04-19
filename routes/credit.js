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
	})

	router.get('/', function (req, res) {
		var searchText = req.query.sSearch;
        var displayLength = req.query.iDisplayLength;
        displayStart = req.query.iDisplayStart;
        echo = req.query.sEcho;

		var Credit = Parse.Object.extend("Credit");
		var countQuery = new Parse.Query(Credit);
        
        if (searchText != null && searchText != "") {
            countQuery.matches('name', searchText,'i');
		}
		
		var tableDataQuery = new Parse.Query(Credit);

		tableDataQuery.ascending("name");
                
		tableDataQuery.limit(parseInt(displayLength));
		
		if(parseInt(displayStart) != 0)
			tableDataQuery.skip(parseInt(displayStart));
			
		tableDataQuery.find({
			success : function (credits) {
				var data = [];
				var creditCount = 0;
				
				for (var i = 0; i < credits.length; i++) {
					var credit = credits[i];
					var creditName = "";
					
					if(credit.get("name") !== null || credit.get("name") !== undefined)
						creditName = credit.get("name");                              
					
					data[creditCount] = {                            
						name : creditName,
						DT_RowId : credit.id
						};
						
					creditCount++;
				}
				
				data =  data.sort(function (a, b) {
						return a["name"].toLowerCase().localeCompare(b["name"].toLowerCase());
					});
				
				res.json({
					aaData : data,
					iTotalRecords : 0,
					iTotalDisplayRecords : 0,
					sEcho : echo
				});
			}
		});
	});

	router.get('/dropdown', function (req, res) {
        echo = req.query.sEcho;
		var Credit = Parse.Object.extend("Credit");
		var countQuery = new Parse.Query(Credit);

		countQuery.count({
			success : function (count){                
                var tableDataQuery = new Parse.Query(Credit);
				
                tableDataQuery.ascending("name");
                    
				tableDataQuery.find({
					success : function (credits) {
						var data = [];
						var creditCount = 0;
                        
						for (var i = 0; i < credits.length; i++) {
							var credit = credits[i];
                            var creditName = "";
                            
                            if(credit.get("name") !== null && credit.get("name") !== undefined)
								creditName = credit.get("name");
							
							if (creditName !== "")
							{
								data[creditCount] = {                            
								name : creditName,
								DT_RowId : credit.id
								};
								
								creditCount++;
							}
						}
						
						data =  data.sort(function (a, b) {
								return a["name"].toLowerCase().localeCompare(b["name"].toLowerCase());
							});

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
