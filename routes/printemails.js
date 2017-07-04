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

router.get('/download', function (req, res, next) {
        var UserEmail = Parse.Object.extend("UserEmail");
		var countQuery = new Parse.Query(UserEmail);	
		var rightNow = new Date();
		var fileDate = rightNow.toISOString().slice(0,10).replace(/-/g,"");
		countQuery.limit(1000000);
		
		countQuery.count({
			success : function (count){                
                var tableDataQuery = new Parse.Query(UserEmail);
				tableDataQuery.limit(1000000);
                tableDataQuery.ascending("email");
                    
				tableDataQuery.find({
					success : function (userEmails) {		
						var fs = require('fs');
						var stream = fs.createWriteStream("./routes/emailsandages.txt");
						
						stream.once('open', function(fd) {                        
							for (var i = 0; i < userEmails.length; i++) {
								var userEmail = userEmails[i];
								var email = "";
								var age = "";
								var writeValue = "";
								
								if(userEmail.get("email") !== null && userEmail.get("email") !== undefined && userEmail.get("email") !== "")
									email = userEmail.get("email");
								
								if(userEmail.get("age") !== null && userEmail.get("age") !== undefined && userEmail.get("age") !== "")
									age = userEmail.get("age");
																
								if (email !== "")
								{
									writeValue = email;									
								}
								
								if (age !== "")
								{
									writeValue = writeValue + " " + age;
								}
								
								stream.write(writeValue + "\n");
							}		
							
							stream.end();						
						});

						stream.on('finish', function() {
								var path = require('path');
								var file = path.join(__dirname, "emailsandages.txt");
						
								res.download(file, "emailsandages_" + fileDate + ".txt", function (err) {
									   if (err) {
										   console.log("Error");
										   console.log(err);
									   } else {
										   console.log("Success");
									   }
								   });
							});
					}	  
				});
			},
			error : function (error) {
				// The request failed
			}
		});
});