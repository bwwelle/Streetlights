var express = require('express');
var Parse = require('parse/node').Parse;
var router = express.Router();
module.exports = router;

router.post('/', function(req, res) {
	Parse.initialize("***REMOVED***", "***REMOVED***");

	var Track = Parse.Object.extend("Track");
	var query = new Parse.Query(Track);

	query.ascending("artist");

	query.find({
		success : function (tracks) {
			var data = [];

			for (var i = 0; i < tracks.length; i++) {
				var track = tracks[i];

				data[i] = {
                    title : track.get('title'),
					artist : track.get("artist"),
                    producer : track.get('producer')
				};              
			}	
            
            res.json(data);
		}
		
		// 1. You need to return inside the callback of success or it will not wait since .find() is async.
		// 2. This will look for a an about template in your template directory
		// 3. In your about template, you can iterate over tracks and dispaly them with whatever view/template engine you're using (default is Jade)
	});
});

module.exports = router;