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
		displayStart = req.query.iDisplayStart;
		echo = req.query.sEcho;
		if (searchText != null && searchText != "") {}

		var Teaching = Parse.Object.extend("Teaching");
		var countQuery = new Parse.Query(Teaching);
        
        var teachingId = req.query["teachingId"];

        if(teachingId == undefined || teachingId == "" || teachingId == null){
            countQuery.count({
                success : function (count) {
                    var tableDataQuery = new Parse.Query(Teaching);
                    tableDataQuery.include("lessonGroups");
                    
                    tableDataQuery.limit(10);

                    if (parseInt(displayStart) != 0)
                        tableDataQuery.skip(parseInt(displayStart));

                    tableDataQuery.find({
                        success : function (teachings) {
                            var data = [];

                            for (var i = 0; i < teachings.length; i++) {
                                var teaching = teachings[i];
                                var teachingTitle = "";
                                var teachingLessonGroups = [];

                                if (teaching.get("title") !== null && teaching.get("title") !== undefined)
                                    teachingTitle = teaching.get("title");

                                if (teaching.get("lessonGroups") !== null && teaching.get("lessonGroups") !== undefined) {
                                    for (var z = 0; z < teaching.get("lessonGroups").length; z++){
                                        teachingLessonGroups.push(teaching.get("lessonGroups")[z].get("title"));
                                    }									
                                }

                                data[i] = {
                                    title : teachingTitle,
                                    lessongroups : teachingLessonGroups.join(","),
                                    DT_RowId : teaching.id
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
        }
        else
        {
            var teaching = Parse.Object.extend("Teaching");
			var teachingQuery = new Parse.Query(teaching);
			teachingQuery.include("lessonGroups");
            
            teachingQuery.get(teachingId, {
				success : function (teaching) {
                    var teachingLessonGroups = [];

                    for (var z = 0; z < teaching.get("lessonGroups").length; z++){
                        teachingLessonGroups.push(teaching.get("lessonGroups")[z].id);
                    }
                    
					res.json({
						"teachingId" : teachingId,
                        "teachingTitle" : teaching.get("title"),
						"teachingLessonGroups" : teachingLessonGroups,
						sEcho : echo
					});
				},
				error : function (error) {
					// The request failed
				}
			});            
        }
	});

router.post('/update', urlencodedParser, function (req, res) {
	var Teaching = Parse.Object.extend("Teaching");
	var teaching = new Teaching();
    
	teaching.id = req.body.teachingId;
    teaching.unset("lessonGroups");
    
    var teachingLessonGroups = req.body.teachingLessonGroups;
    
    for (var i = 0; i < teachingLessonGroups.length; i++) {
        var LessonGroup = Parse.Object.extend("LessonGroup");
        var lessonGroup = new LessonGroup();
        
        lessonGroup.id = teachingLessonGroups[i];
    
        teaching.addUnique("lessonGroups", lessonGroup);
    }
    
    teaching.set("title", req.body.teachingTitle);

	teaching.save(null, {
		success : function (results) {
			res.json("Teaching Saved!");
		},
		error : function (results, error) {
			res.json("Teaching Save Error!");
		}
	});
});

router.post('/add', urlencodedParser, function (req, res) {
    var Teaching = Parse.Object.extend("Teaching");
	var teaching = new Teaching();
	var query = new Parse.Query(teaching);
    teachingLessonGroups = req.body.teachingLessonGroupsAdd;
    
	teaching.set("title", req.body.teachingTitle);
    
    for (var i = 0; i < teachingLessonGroups.length; i++) {
        var LessonGroup = Parse.Object.extend("LessonGroup");
        var lessonGroup = new LessonGroup();
        
        lessonGroup.id = teachingLessonGroups[i];
    
        teaching.addUnique("lessonGroups", lessonGroup);
    }

	teaching.save(null, {
		success : function (teaching) {
			res.json("Teaching Saved!");
		},
		error : function (teaching, error) {
			res.json("Teaching Save Error!");
		}
	});
});

router.post('/delete', urlencodedParser, function (req, res) {
	var Teaching = Parse.Object.extend("Teaching");
	var query = new Parse.Query(Teaching);

	var teachingID = req.body.teachingId;

	query.get(teachingID, {
		success : function (myObj) {
			// The object was retrieved successfully.
			myObj.destroy({});
			res.end();
		},
		error : function (object, error) {
			res.json("Deletion Error: " + error);
		}
	});
});

module.exports = router;
