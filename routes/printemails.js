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
		var tableDataQuery = new Parse.Query(UserEmail);
        tableDataQuery.limit(9999999999999);
        tableDataQuery.ascending("email");
            
        tableDataQuery.find({
            success : function (userEmails) {		
                var fs = require('fs');
                var stream = fs.createWriteStream("./routes/emailsandages.xls");
                var writeHeader = true;
                
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
                        
                        if(writeHeader)
                        {
                            writeValue = "Email" + "\t" + "Age" + "\n";
                            writeHeader = false;
                        }
                        
                        if (email !== "")
                        {
                            writeValue = writeValue + email;									
                        }
                        
                        if (age !== "")
                        {
                            writeValue = writeValue + "\t" + age;
                        }
                        
                        stream.write(writeValue + "\n");
                    }		
                    
                    stream.end();						
                });

                stream.on('finish', function() {
                        var path = require('path');
                        var file = path.join(__dirname, "emailsandages.xls");
                        
                        res.set('Content-Type', 'application/vnd.ms-excel');
                
                        res.download(file, "emailsandages_" + fileDate + ".xls", function (err) {
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
});