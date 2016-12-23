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
        tableDataQuery.include("producers");
		tableDataQuery.include("artists");

		tableDataQuery.ascending("name");
		tableDataQuery.limit(parseInt(displayLength));

		if (parseInt(displayStart) != 0)
			tableDataQuery.skip(parseInt(displayStart));

		tableDataQuery.find({
			success : function (mediaItems) {
				var data = [];
				for (var
					i = 0; i < mediaItems.length; i++) {
					var mediaItem = mediaItems[i];
                    var mediaItemProducer = '';
					var mediaItemProducerId = '';
					var mediaItemArtist = '';
					var mediaItemArtistId = '';
					var mediaItemName = '';
					var mediaItemDuration = '';
					var mediaItemContentURL = '';
					var mediaItemType = '';
                    
                    if (mediaItem.get("producers") !== null && mediaItem.get("producers") !== undefined) {
						if (mediaItem.get("producers")[0] !== null && mediaItem.get("producers")[0] !== undefined)
							mediaItemProducer = mediaItem.get("producers")[0].get("name");
					}

					if (mediaItem.get("artists") !== null && mediaItem.get("artists") !== undefined) {
						if (mediaItem.get("artists")[0] !== null && mediaItem.get("artists")[0] !== undefined)
							mediaItemArtist = mediaItem.get("artists")[0].get("name");
					}

					if (mediaItem.get("name") !== null && mediaItem.get("name") !== undefined)
						mediaItemName = mediaItem.get("name");
					
					if (mediaItem.get("type") !== null && mediaItem.get("type") !== undefined)
						mediaItemType = mediaItem.get("type");

					if (mediaItem.get("duration") !== null && mediaItem.get("duration") !== undefined)
						mediaItemDuration = ConvertDurationTime(mediaItem.get("duration"));

					if (mediaItem.get("contentURL") !== null && mediaItem.get("contentURL") !== undefined)
						mediaItemContentURL = mediaItem.get("contentURL");

					data[i] = {
						name : mediaItemName,
						type : mediaItemType,
						duration : mediaItemDuration,
						contentURL : mediaItemContentURL,
                        producer : mediaItemProducer,
						artist : mediaItemArtist,
						DT_RowId : mediaItem.id
					};
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
	})
});

router.get('/dropdown', function (req, res) {
	echo = req.query.sEcho;

	var MediaItem = Parse.Object.extend("MediaItem");
	var countQuery = new Parse.Query(MediaItem);
	
	countQuery.limit = 1000;
	
	countQuery.count().then(function (count) {
		var tableDataQuery = new Parse.Query(MediaItem);
		tableDataQuery.limit = 1000;
        tableDataQuery.include("producers");
		tableDataQuery.include("artists");

		tableDataQuery.ascending("name");

		tableDataQuery.find({
			success : function (mediaItems) {
				var data = [];
				for (var
					i = 0; i < mediaItems.length; i++) {
					var mediaItem = mediaItems[i];
                    var mediaItemProducer = '';
					var mediaItemProducerId = '';
					var mediaItemArtist = '';
					var mediaItemArtistId = '';
					var mediaItemName = '';
					var mediaItemDuration = '';
					var mediaItemContentURL = '';
					var mediaItemType = '';
                    
                    if (mediaItem.get("producers") !== null && mediaItem.get("producers") !== undefined) {
						if (mediaItem.get("producers")[0] !== null && mediaItem.get("producers")[0] !== undefined)
							mediaItemProducer = mediaItem.get("producers")[0].get("name");
					}

					if (mediaItem.get("artists") !== null && mediaItem.get("artists") !== undefined) {
						if (mediaItem.get("artists")[0] !== null && mediaItem.get("artists")[0] !== undefined)
							mediaItemArtist = mediaItem.get("artists")[0].get("name");
					}

					if (mediaItem.get("name") !== null && mediaItem.get("name") !== undefined)
						mediaItemName = mediaItem.get("name");
					
					if (mediaItem.get("type") !== null && mediaItem.get("type") !== undefined)
						mediaItemType = mediaItem.get("type");

					if (mediaItem.get("duration") !== null && mediaItem.get("duration") !== undefined)
						mediaItemDuration = ConvertDurationTime(mediaItem.get("duration"));

					if (mediaItem.get("contentURL") !== null && mediaItem.get("contentURL") !== undefined)
						mediaItemContentURL = mediaItem.get("contentURL");				
					
					data[i] = {
						name : mediaItemName,
						type : mediaItemType,
						duration : mediaItemDuration,
						contentURL : mediaItemContentURL,
                        producer : mediaItemProducer,
						artist : mediaItemArtist,
						DT_RowId : mediaItem.id
					};
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
	
	var Bible = Parse.Object.extend("Bible");
	var bible = new Bible();
	bible.id = "eL7PbRMeBv";
	
	var duration = req.query["durationEdit"].split(":");

	var durationInSeconds = ConvertDurationForSave(duration[0], duration[1], duration[2]);

	mediaItem.id = req.query["mediaItemEditId"];
	mediaItem.set("name", req.query["nameEdit"]);
	mediaItem.set("duration", parseInt(durationInSeconds));
	mediaItem.set("contentURL", req.query["contentURLEdit"]);
	mediaItem.set("shareURL", req.query["contentURLEdit"]);
	mediaItem.set("version", bible);
	mediaItem.set("language","eng");
	mediaItem.set("type", req.query["typeEdit"]);

	var producerId = req.query["producerEdit"];
    var Producer = Parse.Object.extend("Credit");
	var producer = new Producer();
    var artistId = req.query["artistEdit"];
	var Artist = Parse.Object.extend("Credit");
	var artist = new Artist();
    
    producer.id = producerId
    mediaItem.unset("producers");
	mediaItem.addUnique("producers", producer);
	artist.id = artistId;
	mediaItem.unset("artists");
	mediaItem.addUnique("artists", artist);

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
	
	var Bible = Parse.Object.extend("Bible");
	var bible = new Bible();
	bible.id = "eL7PbRMeBv";
	
	var duration = req.body.duration.split(":");

	var durationInSeconds = ConvertDurationForSave(duration[0], duration[1], duration[2]);

	mediaItem.set("name", req.body.name);
	mediaItem.set("duration", parseInt(durationInSeconds));
	mediaItem.set("contentURL", req.body.contentURL);
	mediaItem.set("shareURL", req.body.contentURL);
	mediaItem.set("type", req.body.mediaitemtype);
	mediaItem.set("version", bible);
	mediaItem.set("language", "eng");
    mediaItem.unset("producers");
	mediaItem.unset("artists");
    
    var Producer = Parse.Object.extend("Credit");
	var producer = new Producer();
	producer.id = req.body.mediaitemproducer;
	mediaItem.addUnique("producers", producer);

	var Artist = Parse.Object.extend("Credit");
	var artist = new Artist();
	artist.id = req.body.mediaitemartist;
	mediaItem.addUnique("artists", artist);

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
