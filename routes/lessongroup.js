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

		var LessonGroup = Parse.Object.extend("LessonGroup");
		var countQuery = new Parse.Query(LessonGroup);
        
        var lessonGroupId = req.query["lessonGroupId"];

        if(lessonGroupId == undefined || lessonGroupId == "" || lessonGroupId == null){
            countQuery.count({
                success : function (count) {
                    var tableDataQuery = new Parse.Query(LessonGroup);
                    tableDataQuery.include("lessons");
                    
                    tableDataQuery.limit(10);

                    if (parseInt(displayStart) != 0)
                        tableDataQuery.skip(parseInt(displayStart));

                    tableDataQuery.find({
                        success : function (lessonGroups) {
                            var data = [];

                            for (var i = 0; i < lessonGroups.length; i++) {
                                var lessonGroup = lessonGroups[i];
                                var lessonGroupTitle = "";
                                var lessonGroupLessons = [];

                                if (lessonGroup.get("title") !== null && lessonGroup.get("title") !== undefined)
                                    lessonGroupTitle = lessonGroup.get("title");

                                if (lessonGroup.get("lessons") !== null && lessonGroup.get("lessons") !== undefined) {
                                    for (var z = 0; z < lessonGroup.get("lessons").length; z++){
                                        lessonGroupLessons.push(lessonGroup.get("lessons")[z].get("title"));
                                    }									
                                }

                                data[i] = {
                                    lessonGroupTitle : lessonGroupTitle,
                                    lessons : lessonGroupLessons.join(","),
                                    DT_RowId : lessonGroup.id
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
            var lessonGroup = Parse.Object.extend("LessonGroup");
			var lessonGroupQuery = new Parse.Query(lessonGroup);
			lessonGroupQuery.include("lessons");
            
            lessonGroupQuery.get(lessonGroupId, {
				success : function (lessonGroup) {
                    var lessonGroupLessons = [];

                    for (var z = 0; z < lessonGroup.get("lessons").length; z++){
                        lessonGroupLessons.push(lessonGroup.get("lessons")[z].id);
                    }
                    
					res.json({
						"lessonGroupId" : lessonGroupId,
						"lessonGroupLessons" : lessonGroupLessons,
						sEcho : echo
					});
				},
				error : function (error) {
					// The request failed
				}
			});            
        }
	});
    
router.get('/dropdown', urlencodedParser, function (req, res) {
	echo = req.query.sEcho;

	var LessonGroup = Parse.Object.extend("LessonGroup");
	var tableDataQuery = new Parse.Query(LessonGroup);
    tableDataQuery.limit(999999999999999);

    tableDataQuery.ascending("title");

    tableDataQuery.find({
        success : function (lessonGroups) {
            var data = [];
            for (var
                i = 0; i < lessonGroups.length; i++) {
                var lessonGroup = lessonGroups[i];
                var title = '';
                
                if (lessonGroup.get("title") !== null && lessonGroup.get("title") !== undefined)
                    title = lessonGroup.get("title");
                
                data[i] = {
                    title : title,
                    DT_RowId : lessonGroup.id
                };
            }
            
            data =  data.sort(function (a, b) {
                            return a["title"].toLowerCase().localeCompare(b["title"].toLowerCase());
                        });

            res.json({
                aaData : data,
                sEcho : echo
            });
        }
    });
});
    
router.post('/update', urlencodedParser, function (req, res) {
	var LessonGroup = Parse.Object.extend("LessonGroup");
	var lessonGroup = new LessonGroup();
    
	lessonGroup.id = req.body.lessonGroupId;
    lessonGroup.unset("lessons");
    
    var lessonGroupLessons = req.body.lessonGroupLessonsEdit;
    
    for (var i = 0; i < lessonGroupLessons.length; i++) {
        var Lesson = Parse.Object.extend("Lesson");
        var lesson = new Lesson();
        
        lesson.id = lessonGroupLessons[i];
    
        lessonGroup.addUnique("lessons", lesson);
    }

	lessonGroup.save(null, {
		success : function (results) {
			res.json("Lesson Group Saved!");
		},
		error : function (results, error) {
			res.json("Lesson Group Save Error!");
		}
	});
});

router.post('/add', urlencodedParser, function (req, res) {
	var LessonGroup = Parse.Object.extend("LessonGroup");
	var lessonGroup = new LessonGroup();
	var query = new Parse.Query(lessonGroup);
    lessonGroupLessons = req.body.lessons;
    
	lessonGroup.set("title", req.body.title);
    
    for (var i = 0; i < lessonGroupLessons.length; i++) {
        var Lesson = Parse.Object.extend("Lesson");
        var lesson = new Lesson();
        
        lesson.id = lessonGroupLessons[i];
    
        lessonGroup.addUnique("lessons", lesson);
    }

	lessonGroup.save(null, {
		success : function (lessonGroup) {
			res.json("Lesson Group Saved!");
		},
		error : function (lessonGroup, error) {
			res.json("Lesson Group Save Error!");
		}
	});
});


router.post('/delete', urlencodedParser, function (req, res) {
	var LessonGroup = Parse.Object.extend("LessonGroup");
	var query = new Parse.Query(LessonGroup);

	var lessonGroupID = req.body.id;

	query.get(lessonGroupID, {
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
