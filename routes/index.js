var express = require('express');
var Parse = require('parse/node').Parse;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	Parse.initialize("***REMOVED***", "***REMOVED***");

	var Track = Parse.Object.extend("Track");
	var query = new Parse.Query(Track);

	query.ascending("title");

	query.find({
		success : function (tracks) {
			var data = [];

			for (var i = 0; i < tracks.length; i++) {
				var track = tracks[i];

				data[i] = {
					id : track.id,
					title : track.get('title'),
					time : track.get("time"),
					artist : track.get("artist"),
					producer : track.get("producer"),
					track : track
				};
			}	
			
			res.render('index', { title: 'StreetLights Backend',
								  tracks: data 
								});
		}
		
		// 1. You need to return inside the callback of success or it will not wait since .find() is async.
		// 2. This will look for a an about template in your template directory
		// 3. In your about template, you can iterate over tracks and dispaly them with whatever view/template engine you're using (default is Jade)
	});
});

module.exports = router;
