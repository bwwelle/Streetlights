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
		displayStart = req.query.iDisplayStart;
		echo = req.query.sEcho;
		if (searchText != null && searchText != "") {}

		var MediaGroup = Parse.Object.extend("MediaGroup");
		var countQuery = new Parse.Query(MediaGroup);

		countQuery.count({
			success : function (count) {
				var tableDataQuery = new Parse.Query(MediaGroup);
				tableDataQuery.include("artists");

				tableDataQuery.descending("name");
				tableDataQuery.limit(10);

				if (parseInt(displayStart) != 0)
					tableDataQuery.skip(parseInt(displayStart));

				tableDataQuery.find({
					success : function (mediaGroups) {
						var data = [];

						for (var i = 0; i < mediaGroups.length; i++) {
							var mediaGroup = mediaGroups[i];
							var mediaGroupTitle = "";
							var mediaGroupDetail = null;
							var mediaGroupImageURL = "";
							var mediaGroupArtist = "";

							if (mediaGroup.get("title") !== null && mediaGroup.get("title") !== undefined)
								mediaGroupTitle = mediaGroup.get("title");

							if (mediaGroup.get("detail") !== null && mediaGroup.get("detail") !== undefined)
								mediaGroupDetail = mediaGroup.get("detail");

							if (mediaGroup.get("imageURL") !== null && mediaGroup.get("imageURL") !== undefined)
								mediaGroupImageURL = mediaGroup.get("imageURL");

							if (mediaGroup.get("artists") !== null && mediaGroup.get("artists") !== undefined)
                            {
                                if(mediaGroup.get("artists")[0] !== null && mediaGroup.get("artists")[0] !== undefined)
                                    mediaGroupArtist = mediaGroup.get("artists")[0].get("name");
                            }
                            
							data[i] = {
								title : mediaGroupTitle,
								detail : mediaGroupDetail,
								imageURL : mediaGroupImageURL,
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
	Parse.initialize("***REMOVED***", "***REMOVED***");

	var MediaGroup = Parse.Object.extend("MediaGroup");
	var mediaGroup = new MediaGroup();
    
    mediaGroup.id = req.body.mediaGroupId;
    
	mediaGroup.set("title", req.body.title);
	mediaGroup.set("detail", req.body.detail);
	mediaGroup.set("imageURL", req.body.imageURL);

	var Credit = Parse.Object.extend("Credit");
	var credit = new Credit();
    
	credit.id = req.body.artist;
    mediaGroup.unset("artists");
	mediaGroup.addUnique("artists", credit);

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
	Parse.initialize("***REMOVED***", "***REMOVED***");

	var MediaGroup = Parse.Object.extend("MediaGroup");
	var mediaGroup = new MediaGroup();

	mediaGroup.set("title", req.body.title);
	mediaGroup.set("detail", req.body.detail);
	mediaGroup.set("imageURL", req.body.imageURL);

	var Credit = Parse.Object.extend("Credit");
	var credit = new Credit();
    
	credit.id = req.body.artist;
	mediaGroup.addUnique("artists", credit);

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
	Parse.initialize("***REMOVED***", "***REMOVED***");

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

module.exports = router;
