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

	var MediaItem = Parse.Object.extend("MediaItem");
	var countQuery = new Parse.Query(MediaItem);    
    
    if (searchText != null && searchText != "") {
        countQuery.matches('name', searchText,'i');
    }
    
	countQuery.count().then(function (count) {
		var tableDataQuery = new Parse.Query(MediaItem);        
        
        if (searchText != null && searchText != "") {
            tableDataQuery.matches('name', searchText,'i');
        }

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
                    var mediaItemImageURL = '';
					var mediaItemType = '';
					var mediaItemText = '';
                    var mediaItemDescription = '';
                    
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
                    
                    if (mediaItem.get("imageURL") !== null && mediaItem.get("imageURL") !== undefined)
						mediaItemImageURL = mediaItem.get("imageURL");

					if (mediaItem.get("text") !== null && mediaItem.get("text") !== undefined)
						mediaItemText = mediaItem.get("text");             

                    if (mediaItem.get("description") !== null && mediaItem.get("description") !== undefined)
						mediaItemDescription = mediaItem.get("description");                                 

					data[i] = {
						name : mediaItemName,
						type : mediaItemType,
						duration : mediaItemDuration,
						contentURL : mediaItemContentURL,
                        imageURL : mediaItemImageURL,
                        producer : mediaItemProducer,
						artist : mediaItemArtist,
						text : mediaItemText,
                        description: mediaItemDescription,
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

router.get('/dropdown', urlencodedParser, function (req, res) {
    var mediaItemType = req.body.type;
	echo = req.query.sEcho;

	var MediaItem = Parse.Object.extend("MediaItem");
	var countQuery = new Parse.Query(MediaItem);
	
	countQuery.limit(999999999999999);
    
    if(mediaItemType == 'lessonPageItem')
        countQuery.containedIn("type",
                  ["lessonVideo", "lessonText", "lessonAudio", "lessonImage"]);
    else
        countQuery.notContainedIn("playerName",
                  ["lessonVideo", "lessonText", "lessonAudio", "lessonImage"]);
	
	countQuery.count().then(function (count) {
		var tableDataQuery = new Parse.Query(MediaItem);
		tableDataQuery.limit(999999999999999);
        
        if(mediaItemType == 'lessonPageItem')
            tableDataQuery.containedIn("type",
                  ["lessonVideo", "lessonText", "lessonAudio", "lessonImage"]);
        else
            tableDataQuery.notContainedIn("playerName",
                  ["lessonVideo", "lessonText", "lessonAudio", "lessonImage"]);
                  
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
                    var mediaItemImageURL = '';
					var mediaItemType = '';
					var mediaItemText = '';
                    var mediaItemDescription = '';
                    
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

                    if (mediaItem.get("imageURL") !== null && mediaItem.get("imageURL") !== undefined)
						mediaItemImageURL = mediaItem.get("imageURL");	

					if (mediaItem.get("text") !== null && mediaItem.get("text") !== undefined)
						mediaItemText = mediaItem.get("text");	 

                    if (mediaItem.get("description") !== null && mediaItem.get("description") !== undefined)
						mediaItemDescription = mediaItem.get("description");                                 
					
					data[i] = {
						name : mediaItemName,
						type : mediaItemType,
						duration : mediaItemDuration,
						contentURL : mediaItemContentURL,
                        imageURL : mediaItemImageURL,
                        producer : mediaItemProducer,
						artist : mediaItemArtist,
						text : mediaItemText,
                        description : mediaItemDescription,
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

router.post('/update', urlencodedParser, function (req, res) {
	var MediaItem = Parse.Object.extend("MediaItem");
	var mediaItem = new MediaItem();
	
	var Bible = Parse.Object.extend("Bible");
	var bible = new Bible();
	bible.id = "eL7PbRMeBv";
	
	var duration = req.body.duration.split(":");

	var durationInSeconds = ConvertDurationForSave(duration[0], duration[1], duration[2]);   

	mediaItem.id = req.body.mediaItemId;    
    
	var producerId = req.body.producer;
    var Producer = Parse.Object.extend("Credit");
	var producer = new Producer();
    var artistId = req.body.artist;
	var Artist = Parse.Object.extend("Credit");
	var artist = new Artist();
    
    producer.id = producerId;  
    mediaItem.unset("producers");
    mediaItem.save();
	mediaItem.addUnique("producers", producer);
    mediaItem.save();
    
	artist.id = artistId;
    mediaItem.unset("artists");
    mediaItem.save();
	mediaItem.addUnique("artists", artist);
    mediaItem.save();    

	mediaItem.set("name", req.body.name);
	mediaItem.set("duration", parseInt(durationInSeconds));
	mediaItem.set("contentURL", req.body.contentURL);
    mediaItem.set("imageURL", req.body.imageURL);
	mediaItem.set("shareURL", req.body.contentURL);
	mediaItem.set("version", bible);
	mediaItem.set("language","eng");
	mediaItem.set("type", req.body.type);
	mediaItem.set("text", req.body.text);
    mediaItem.set("description", req.body.description);    

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
    
    var Producer = Parse.Object.extend("Credit");
	var producer = new Producer();
	producer.id = req.body.producer;
	mediaItem.addUnique("producers", producer);
    mediaItem.save();

	var Artist = Parse.Object.extend("Credit");
	var artist = new Artist();
	artist.id = req.body.artist;
	mediaItem.addUnique("artists", artist);
    mediaItem.save();

	mediaItem.set("name", req.body.name);
	mediaItem.set("duration", parseInt(durationInSeconds));
	mediaItem.set("contentURL", req.body.contentURL);
    mediaItem.set("imageURL", req.body.imageURL);
	mediaItem.set("text", req.body.text);
    mediaItem.set("description", req.body.description);
	mediaItem.set("shareURL", req.body.contentURL);
	mediaItem.set("type", req.body.type);
	mediaItem.set("version", bible);
	mediaItem.set("language", "eng");
    

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
