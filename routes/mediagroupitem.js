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

	router.get('/', urlencodedParser, function (req, res) {
		echo = req.query.sEcho;
		var mediaGroupId = req.query["mediaGroupId"];
		var mediaItemId = req.query["mediaItemId"];
		var displayLength = req.query.iDisplayLength;
		displayStart = req.query.iDisplayStart;

		Parse.initialize("***REMOVED***", "***REMOVED***");

		if (mediaGroupId !== undefined && mediaGroupId !== null && mediaGroupId !== "") {
			var MediaGroup = Parse.Object.extend("MediaGroup");
			var mediaGroupQuery = new Parse.Query(MediaGroup);
			mediaGroupQuery.include("items");
			mediaGroupQuery.include("items.artists");

			var totalRecordsToView = parseInt(displayStart) + parseInt(displayLength);
			var recordCount = 0;

			mediaGroupQuery.get(mediaGroupId, {
				success : function (mediaGroup) {
					var data = [];
					for (var i = parseInt(displayStart); i < totalRecordsToView && i < mediaGroup.get("items").length; i++) {
						if (mediaGroup.get("items")[i] !== null && mediaGroup.get("items")[i] !== undefined) {
							var mediaItem = mediaGroup.get("items")[i];
							var mediaItemCredit = '';
							var mediaItemName = '';
							var mediaItemDuration = '';
							var mediaItemContentURL = '';

							if (mediaItem.get("artists") !== null && mediaItem.get("artists") !== undefined) {
								if (mediaItem.get("artists")[0] !== null && mediaItem.get("artists")[0] !== undefined)
									mediaItemCredit = mediaItem.get("artists")[0].get("name");
							}

							if (mediaItem.get("name") !== null && mediaItem.get("name") !== undefined)
								mediaItemName = mediaItem.get("name");

							if (mediaItem.get("duration") !== null && mediaItem.get("duration") !== undefined)
								mediaItemDuration = ConvertDurationTime(mediaItem.get("duration"));

							if (mediaItem.get("contentURL") !== null && mediaItem.get("contentURL") !== undefined)
								mediaItemContentURL = mediaItem.get("contentURL");

							data[recordCount] = {
								name : mediaItemName,
								duration : mediaItemDuration,
								contentURL : mediaItemContentURL,
								artist : mediaItemCredit,
								DT_RowId : mediaItem.id
							};
						}
						recordCount++;
					}

					res.json({
						aaData : data,
						iTotalRecords : mediaGroup.get("items").length,
						iTotalDisplayRecords : mediaGroup.get("items").length,
						sEcho : echo
					});
				},
				error : function (error) {
					// The request failed
				}
			});
		} else if (mediaItemId !== undefined && mediaItemId !== null && mediaItemId !== "") {
			var mediaItem = Parse.Object.extend("MediaItem");
			var mediaItemQuery = new Parse.Query(mediaItem);
			mediaItemQuery.include("artists");

			mediaItemQuery.get(mediaItemId, {
				success : function (mediaItem) {
					var mediaItemName = '';
					var mediaItemDuration = '';
					var mediaItemContentURL = '';
					var mediaItemCredit = '';

					if (mediaItem.get("artists") !== null && mediaItem.get("artists") !== undefined) {
						if (mediaItem.get("artists")[0] !== null && mediaItem.get("artists")[0] !== undefined)
							mediaItemCredit = mediaItem.get("artists")[0].get("name");
					}

					if (mediaItem.get("name") !== null && mediaItem.get("name") !== undefined)
						mediaItemName = mediaItem.get("name");

					if (mediaItem.get("duration") !== null && mediaItem.get("duration") !== undefined)
						mediaItemDuration = ConvertDurationTime(mediaItem.get("duration"));

					if (mediaItem.get("contentURL") !== null && mediaItem.get("contentURL") !== undefined)
						mediaItemContentURL = mediaItem.get("contentURL");

					res.json({
						"mediaGroupItemId" : mediaItemId,
						"mediaGroupItemDurationAdd" : mediaItemDuration,
						"mediaGroupItemContentURLAdd" : mediaItemContentURL,
						"mediaGroupItemArtistAdd" : mediaItemCredit,
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
				name : null,
				duration : null,
				contentURL : null,
				artist : null,
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

function ConvertDurationTime(duration) {
	var storedSeconds = 0;

	if (duration != null)
		storedSeconds = duration;

	var hours = 0;
	var minutes = 0;
	var seconds = 0;

	if (storedSeconds > 3599) {
		hours = Math.floor(storedSeconds / 3600);
		storedSeconds = storedSeconds - hours * 3600;

		minutes = Math.floor(storedSeconds / 60);

		seconds = storedSeconds - minutes * 60;
	} else if (storedSeconds > 59) {
		minutes = Math.floor(storedSeconds / 60);
		seconds = storedSeconds - minutes * 60;
	} else
		seconds = storedSeconds;

	return pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2);
};

function pad(num, size) {
	var s = num + "";
	while (s.length < size)
		s = "0" + s;
	return s;
}

router.post('/update', urlencodedParser, function (req, res) {
	Parse.initialize("***REMOVED***", "***REMOVED***");

	var MediaGroup = Parse.Object.extend("MediaGroup");
	var mediaGroup = new MediaGroup();
	mediaGroup.id = req.body.id;

	if (req.body.columnName == 'duration')
		mediaGroup.set(req.body.columnName, parseInt(req.body.value));
	else
		mediaGroup.set(req.body.columnName, req.body.value);

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

	mediaGroup.id = req.body.mediaGroupId;

	var MediaItem = Parse.Object.extend("MediaItem");
	var mediaItem = new MediaItem();
	mediaItem.id = req.body.mediaGroupItemId;

	mediaGroup.addUnique("items", mediaItem);

	mediaGroup.save(null, {
		success : function (mediaGroup) {
			res.json("Successful Save!");
		},
		error : function (mediaGroup, error) {
			res.json("Save Error!");
		}
	});
});

router.post('/delete', urlencodedParser, function (req, res) {
	Parse.initialize("***REMOVED***", "***REMOVED***");

	var MediaGroup = Parse.Object.extend("MediaGroup");
	var mediaGroup = new MediaGroup();
	mediaGroup.id = req.body.mediaGroupId;
	var MediaItem = Parse.Object.extend("MediaItem");
	var mediaItem = new MediaItem();
	mediaItem.id = req.body.mediaGroupItemId;
	mediaGroup.remove("items", mediaItem);

	mediaGroup.save();

	res.json("Successful Deletion");
});

module.exports = router;
