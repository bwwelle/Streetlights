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

	var MediaItem = Parse.Object.extend("MediaItem");
	var countQuery = new Parse.Query(MediaItem);

	countQuery.count().then(function (count) {
		var tableDataQuery = new Parse.Query(MediaItem);
		tableDataQuery.include("artists");

		tableDataQuery.descending("name");
		tableDataQuery.limit(parseInt(displayLength));

		if (parseInt(displayStart) != 0)
			tableDataQuery.skip(parseInt(displayStart));

		tableDataQuery.find({
			success : function (mediaItems) {
				var data = [];
				for (var
					i = 0; i < mediaItems.length; i++) {
					var mediaItem = mediaItems[i];
					var mediaItemCredit = '';
					var mediaItemCreditId = '';
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
	})
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

router.get('/edit', urlencodedParser, function (req, res) {
	var MediaItem = Parse.Object.extend("MediaItem");
	var mediaItem = new MediaItem();
	var duration = req.query["durationEdit"].split(":");

	var durationInSeconds = ConvertDurationForSave(duration[0], duration[1], duration[2]);

	mediaItem.id = req.query["mediaItemEditId"];
	mediaItem.set("name", req.query["nameEdit"]);
	mediaItem.set("duration", parseInt(durationInSeconds));
	mediaItem.set("contentURL", req.query["contentURLEdit"]);

	var creditId = req.query["artistEdit"];
	var Credit = Parse.Object.extend("Credit");
	var credit = new Credit();
	credit.id = creditId;
	mediaItem.unset("artists");
	mediaItem.addUnique("artists", credit);

	mediaItem.save(null, {
		success : function (results) {
			res.json("Media Item Saved!");
		},
		error : function (results, error) {
			res.json("Media Item Save Error!");
		}
	});
});

router.post('/add', urlencodedParser, function (req, res) {
	var MediaItem = Parse.Object.extend("MediaItem");
	var mediaItem = new MediaItem();
	var duration = req.body.duration.split(":");

	var durationInSeconds = ConvertDurationForSave(duration[0], duration[1], duration[2]);

	mediaItem.set("name", req.body.name);
	mediaItem.set("duration", parseInt(durationInSeconds));
	mediaItem.set("contentURL", req.body.contentURL);
	mediaItem.unset("artists");

	var Credit = Parse.Object.extend("Credit");
	var credit = new Credit();
	credit.id = req.body.mediaitemartist;
	mediaItem.addUnique("artists", credit);

	mediaItem.save(null, {
		success : function (mediaItem) {
			res.json("Media Item Saved!");
		},
		error : function (mediaItem, error) {
			res.json("Media Item Save Error!");
		}
	});
});

function ConvertDurationForSave(formHours, formMinutes, formSeconds) {
	var seconds = parseInt(formSeconds);
	var minutes = parseInt(formMinutes);
	var hours = parseInt(formHours);
	var storedSeconds = 0;

	if (hours > 0)
		storedSeconds = 3600 * hours;

	if (minutes > 0)
		storedSeconds = 60 * minutes + storedSeconds;

	if (seconds > 0)
		storedSeconds = storedSeconds + seconds;

	return storedSeconds;
}

router.post('/delete', urlencodedParser, function (req, res) {
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
