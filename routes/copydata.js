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

router.get('/copydata', function (req, res) {
    var MediaItem = Parse.Object.extend("MediaItem");
	var countQuery = new Parse.Query(MediaItem);
    countQuery.limit(9999999999999);

	countQuery.count().then(function (count) {
		var tableDataQuery = new Parse.Query(MediaItem);
        tableDataQuery.limit(9999999999999);
		tableDataQuery.ascending("name");

		tableDataQuery.find({
			success : function (mediaItems) {
				var data = [];
				for (var
					i = 0; i < mediaItems.length; i++) {
					var mediaItem = mediaItems[i];                    
                    var mediaItemName = '';
                    
                    if (mediaItem.get("name") !== null && mediaItem.get("name") !== undefined)
                    {                        
						mediaItemName = mediaItem.get("name");
                        
                        mediaItem.set("description", mediaItemName);

                        mediaItem.save(null, {
                            success : function (results) {},
                            error : function (results, error) {}
                        });
                    }
				}				
			}
		});
	});
    
    res.json("Media Item Saved!");
});