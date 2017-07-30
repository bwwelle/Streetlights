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

	router.get('/', urlencodedParser, function (req, res) {
		echo = req.query.sEcho;
		var lessonId = req.query["lessonId"];
		var lessonPageId = req.query["lessonPageId"];
		var displayLength = req.query.iDisplayLength;
		displayStart = req.query.iDisplayStart;

		if (lessonId !== undefined && lessonId !== null && lessonId !== "") {
			var Lesson = Parse.Object.extend("Lesson");
			var lessonQuery = new Parse.Query(Lesson);
			lessonQuery.include("pages");
            lessonQuery.include("pages.mediaItems");

			var totalRecordsToView = parseInt(displayStart) + parseInt(displayLength);
			var recordCount = 0;

			lessonQuery.get(lessonId, {
				success : function (lesson) {
					var data = [];
					for (var i = parseInt(displayStart); i < totalRecordsToView && i < lesson.get("pages").length; i++) {
						if (lesson.get("pages")[i] !== null && lesson.get("pages")[i] !== undefined) {
							var lessonPage = lesson.get("pages")[i];
                            var lessonPageId = '';
                            var lessonPageMediaItems = '';
                            
                            if (lessonPage.get("mediaItems") !== null && lessonPage.get("mediaItems") !== undefined) {
								if (lessonPage.get("mediaItems")[0] !== null && lessonPage.get("mediaItems")[0] !== undefined)
									lessonPageMediaItems = lessonPage.get("mediaItems")[0].get("name");
							}

							data[recordCount] = {
								lessonPageId : lessonPage.id,
								mediaItems : lessonPageMediaItems + "...",
								DT_RowId : lessonPage.id
							};
						}
						recordCount++;
					}

					res.json({
						aaData : data,
						iTotalRecords : lesson.get("pages").length,
						iTotalDisplayRecords : lesson.get("pages").length,
						sEcho : echo
					});
				},
				error : function (error) {
					// The request failed
				}
			});
		} else if (lessonPageId !== undefined && lessonPageId !== null && lessonPageId !== "") {
			var lessonPage = Parse.Object.extend("LessonPage");
			var lessonPageQuery = new Parse.Query(lessonPage);
			lessonPageQuery.include("mediaItems");

			lessonPageQuery.get(lessonPageId, {
				success : function (lessonPage) {
					var lessonPageId = '';
                    var lessonPageMediaItems = [];
                    
                    for (var i = 0; i < lessonPage.get("mediaItems").length; i++) {
                        lessonPageMediaItems.push(lessonPage.get("mediaItems")[i].id);
                    }
                    
					res.json({
						"lessonPageId" : lessonPageId,
						"lessonPageMediaItems" : lessonPageMediaItems,
						sEcho : echo
					});
				},
				error : function (error) {
					// The request failed
				}
			});
		} else {
			var data = [];

			data[0] = {
				lessonPageId : null,
				mediaItems : null,
				DT_RowId : 0
			};

			res.json({
				aaData : data,
				iTotalRecords : 0,
				iTotalDisplayRecords : 0,
				sEcho : echo
			});
		};
	});

router.post('/add', urlencodedParser, function (req, res) {
	var Lesson = Parse.Object.extend("Lesson");
	var lesson = new Lesson();

	lesson.id = req.body.lessonId;

	var LessonPage = Parse.Object.extend("LessonPage");
	var lessonPage = new LessonPage();
    var lessonPageItems = req.body.lessonPageItems;
    
    for (var i = 0; i < lessonPageItems.length; i++) {
        var MediaItem = Parse.Object.extend("MediaItem");
        var mediaItem = new MediaItem();
        
        mediaItem.id = lessonPageItems[i];
    
        lessonPage.addUnique("mediaItems", mediaItem);
    }

	lessonPage.save(null, {
		success : function (newLessonPage) {
            lesson.addUnique("pages", newLessonPage.id)
            
			lesson.save(null, {
                success : function (lesson) {
                    res.json("Successful Save!");
                },
                error : function (leson, error) {
                    res.json("Save Error!");
                }
            });
		},
		error : function (leson, error) {
			res.json("Save Error!");
		}
	});
});

router.post('/edit', urlencodedParser, function (req, res) {
	var LessonPage = Parse.Object.extend("LessonPage");
	var lessonPage = new LessonPage();
    
	lessonPage.id = req.body.lessonPageId;
    lessonPage.unset("mediaItems");
    
    var lessonPageItems = req.body.lessonPageItems;
    
    for (var i = 0; i < lessonPageItems.length; i++) {
        var MediaItem = Parse.Object.extend("MediaItem");
        var mediaItem = new MediaItem();
        
        mediaItem.id = lessonPageItems[i];
    
        lessonPage.addUnique("mediaItems", mediaItem);
    }

	lessonPage.save(null, {
		success : function (results) {
			res.json("Lesson Page Saved!");
		},
		error : function (results, error) {
			res.json("Lesson Page Save Error!");
		}
	});
});

router.post('/delete', urlencodedParser, function (req, res) {
	var Lesson = Parse.Object.extend("Lesson");
	var lesson = new Lesson();
	lesson.id = req.body.lessonId;
	var LessonPage = Parse.Object.extend("LessonPage");
	var lessonPage = new LessonPage();
	lessonPage.id = req.body.lessonPageId;
	lesson.remove("pages", lessonPage);

	lesson.save();

	res.json("Successful Deletion");
});

module.exports = router;
