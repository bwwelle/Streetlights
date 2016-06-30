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

		var MediaGroup = Parse.Object.extend("MediaGroup");
		var countQuery = new Parse.Query(MediaGroup);

		countQuery.count({
			success : function (count) {
				var tableDataQuery = new Parse.Query(MediaGroup);
				tableDataQuery.include("producers");
				tableDataQuery.include("artists");

				tableDataQuery.ascending("index");
				tableDataQuery.limit(10);

				if (parseInt(displayStart) != 0)
					tableDataQuery.skip(parseInt(displayStart));

				tableDataQuery.find({
					success : function (mediaGroups) {
						var data = [];

						for (var i = 0; i < mediaGroups.length; i++) {
							var mediaGroup = mediaGroups[i];
							var mediaGroupIndex = "";
							var mediaGroupTitle = "";
							var mediaGroupDetail = null;
							var mediaGroupImageURL = "";
							var mediaGroupProducer = "";
							var mediaGroupArtist = "";

							if (mediaGroup.get("index") !== null && mediaGroup.get("index") !== undefined)
								mediaGroupIndex = mediaGroup.get("index");

							if (mediaGroup.get("title") !== null && mediaGroup.get("title") !== undefined)
								mediaGroupTitle = mediaGroup.get("title");

							if (mediaGroup.get("detail") !== null && mediaGroup.get("detail") !== undefined)
								mediaGroupDetail = mediaGroup.get("detail");

							if (mediaGroup.get("imageURL") !== null && mediaGroup.get("imageURL") !== undefined)
								mediaGroupImageURL = mediaGroup.get("imageURL");

							if (mediaGroup.get("producers") !== null && mediaGroup.get("producers") !== undefined) {
								if (mediaGroup.get("producers")[0] !== null && mediaGroup.get("producers")[0] !== undefined)
									mediaGroupProducer = mediaGroup.get("producers")[0].get("name");
							}

							if (mediaGroup.get("artists") !== null && mediaGroup.get("artists") !== undefined) {
								if (mediaGroup.get("artists")[0] !== null && mediaGroup.get("artists")[0] !== undefined)
									mediaGroupArtist = mediaGroup.get("artists")[0].get("name");
							}

							data[i] = {
								title : mediaGroupTitle,
								index : mediaGroupIndex,
								detail : mediaGroupDetail,
								imageURL : mediaGroupImageURL,
								producer : mediaGroupProducer,
								artist : mediaGroupArtist,
								DT_RowId : mediaGroup.id
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

router.post('/update', urlencodedParser, function (req, res) {
	var MediaGroup = Parse.Object.extend("MediaGroup");
	var mediaGroup = new MediaGroup();

	mediaGroup.id = req.body.mediaGroupId;

	mediaGroup.set("index", req.body.index);
	mediaGroup.set("title", req.body.title);
	mediaGroup.set("detail", req.body.detail);
	mediaGroup.set("imageURL", req.body.imageURL);

	var Producer = Parse.Object.extend("Credit");
	var producer = new Producer();

	producer.id = req.body.producer;
	mediaGroup.unset("producers");
	mediaGroup.addUnique("producers", producer);

	var Artist = Parse.Object.extend("Credit");
	var artist = new Artist();

	artist.id = req.body.artist;
	mediaGroup.unset("artists");
	mediaGroup.addUnique("artists", artist);

	mediaGroup.save(null, {
		success : function (mediaGroup) {
			res.json("Successful Save!");
		},
		error : function (mediaGroup, error) {
			res.json("Save Error!");
		}
	});
});

router.post('/add', urlencodedParser, function (req, res) {
	var MediaGroup = Parse.Object.extend("MediaGroup");
	var mediaGroup = new MediaGroup();

	mediaGroup.set("index", req.body.index);
	mediaGroup.set("title", req.body.title);
	mediaGroup.set("detail", req.body.detail);
	mediaGroup.set("imageURL", req.body.imageURL);

	var Producer = Parse.Object.extend("Credit");
	var producer = new Producer();

	producer.id = req.body.producer;
	mediaGroup.addUnique("producers", producer);

	var Artist = Parse.Object.extend("Credit");
	var artist = new Artist();

	artist.id = req.body.artist;
	mediaGroup.addUnique("artists", artist);

	mediaGroup.save(null, {
		success : function (mediaGroup) {
			res.json(mediaGroup.id);
		},
		error : function (mediaGroup, error) {
			res.json("Save Error!");
		}
	});

});

router.post('/delete', urlencodedParser, function (req, res) {
	var MediaGroup = Parse.Object.extend("MediaGroup");
	var query = new Parse.Query(MediaGroup);

	var mediaGroupID = req.body.id;

	query.get(mediaGroupID, {
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

router.post('/moveup', urlencodedParser, function (req, res) {
	var MediaGroup = Parse.Object.extend("MediaGroup");
	var query = new Parse.Query(MediaGroup);
	var mediaGroupID = req.body.mediaGroupId;
	
	query.get(mediaGroupID, {
		success : function (mediaGroup) {
			var findMediaGrouptoMoveDown = new Parse.Query(MediaGroup);
			findMediaGrouptoMoveDown.equalTo("index",  mediaGroup.get("index") - 1);
			
			findMediaGrouptoMoveDown.find().then(
				function (results) {
				results[0].increment("index");
				results[0].save(null, {
					success : function () {
						mediaGroup.increment("index", -1);

						mediaGroup.save(null, {
							success : function () {
								res.json("Successful Save!");
							},
							error : function (mediaGroup, error) {
								res.json("Save Error!");
							}
						});
					},
					error : function (mediaGroup, error) {
						res.json("Save Error!");
					}
				});
			});			
		},
		error : function (object, error) {
			res.json("Move Up Error: " + error);
		}
	});
});

router.post('/movedown', urlencodedParser, function (req, res) {
	var MediaGroup = Parse.Object.extend("MediaGroup");
	var query = new Parse.Query(MediaGroup);
	var mediaGroupID = req.body.mediaGroupId;
	
	query.get(mediaGroupID, {
		success : function (mediaGroup) {
			var findMediaGrouptoMoveUp = new Parse.Query(MediaGroup);
			findMediaGrouptoMoveUp.equalTo("index",  mediaGroup.get("index") + 1);
			
			findMediaGrouptoMoveUp.find().then(
				function (results) {
				results[0].increment("index", -1);
				results[0].save(null, {
					success : function () {
						mediaGroup.increment("index");

						mediaGroup.save(null, {
							success : function () {
								res.json("Successful Save!");
							},
							error : function (mediaGroup, error) {
								res.json("Save Error!");
							}
						});
					},
					error : function (mediaGroup, error) {
						res.json("Save Error!");
					}
				});
			});			
		},
		error : function (object, error) {
			res.json("Move Down Error: " + error);
		}
	});
});

module.exports = router;
