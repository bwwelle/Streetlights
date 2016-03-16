var express = require('express');
var Parse = require('parse/node').Parse;
var bodyParser = require('body-parser');
var router = express.Router();
var displayStart = 0;
var echo = 0;
module.exports = router;

var urlencodedParser = bodyParser.urlencoded({
		extended : false
	});

var findUserByUsername = function (username, callback) {
	// Perform database query that calls callback when it's done
	// This is our fake database
	if (!users[username])
		return callback(new Error(
				'No user matching '
				 + username));
	return callback(null, users[username]);
};

router.get('/', function (req, res) {
	Parse.initialize("***REMOVED***", "***REMOVED***");

	var searchText = req.query.sSearch;
	displayStart = req.query.iDisplayStart;
	echo = req.query.sEcho;

	if (searchText != null && searchText != "") {}

	var MediaItem = Parse.Object.extend("MediaItem");
	var countQuery = new Parse.Query(MediaItem);

	countQuery.count({
		success : function (count) {
			var tableDataQuery = new Parse.Query(MediaItem);
			tableDataQuery.include("artists");

			tableDataQuery.descending("name");
			tableDataQuery.limit(10);

			if (parseInt(displayStart) != 0)
				tableDataQuery.skip(parseInt(displayStart));

			tableDataQuery.find({
				success : function (mediaItems) {
					var data = [];
					for (var
						i = 0; i < mediaItems.length; i++) {
						var mediaItem = mediaItems[i];
                        var mediaItemCredit = '';
                        var mediaItemName = '';
                        var mediaItemDuration = '';
                        var mediaItemContentURL = '';
                        
						if (mediaItem.get("artists") !== null && mediaItem.get("artists") !== undefined)
							mediaItemCredit = mediaItem.get("artists")[0].get("name");
                            
                        if (mediaItem.get("name") !== null && mediaItem.get("name") !== undefined)
							mediaItemName = mediaItem.get("name");
                        
                        if (mediaItem.get("duration") !== null && mediaItem.get("duration") !== undefined)
							mediaItemDuration = mediaItem.get("duration");
                        
                        if (mediaItem.get("contentURL") !== null && mediaItem.get("contentURL") !== undefined)
							mediaItemContentURL = mediaItem.get("contentURL");

						data[i] = {
							name : mediaItemName,
							duration : mediaItemDuration,
							contentURL : mediaItemContentURL,
							artist : mediaItemCredit,
							DT_RowId : mediaItem.id
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
    var MediaItem = Parse.Object.extend("MediaItem");
	var mediaItem = new MediaItem();
    
    mediaItem.id = req.query["mediaItemEditId"];
    mediaItem.set("name", req.query["nameEdit"]);
    mediaItem.set("duration", parseInt(req.query["durationEdit"]));
    mediaItem.set("contentURL", req.query["contentURLEdit"]);
    //mediaItem.set("name", req.query["artistEdit"]);
    
	mediaItem.save(null, {
		success : function (mediaItem) {
			res.json("Media Item Saved!");
		},
		error : function (mediaItem, error) {
			res.json("Media Item Save Error!");
		}
	});
});

router.post('/add', urlencodedParser, function (req, res) {
	Parse.initialize("***REMOVED***", "***REMOVED***");

	var MediaItem = Parse.Object.extend("MediaItem");
	var mediaItem = new MediaItem();

	mediaItem.set("name", req.body.name);
	mediaItem.set("duration", parseInt(req.body.duration));
	mediaItem.set("contentURL", req.body.contentURL);

	mediaItem.save(null, {
		success : function (mediaItem) {
			res.json("Media Item Saved!");
		},
		error : function (mediaItem, error) {
			res.json("Media Item Save Error!");
		}
	});
});

router.post('/delete', urlencodedParser, function (req, res) {
	Parse.initialize("***REMOVED***", "***REMOVED***");

	var MediaItem = Parse.Object.extend("MediaItem");
	var query = new Parse.Query(MediaItem);

	var mediaItemID = req.body.id;

	query.get(mediaItemID, {
		success : function (myObj) {
			myObj.destroy({});
            
			res.end();
		},
		error : function (object, error) {
			res.json("Media Item Deletion Error: " + error);
		}
	});
});

module.exports = router;
