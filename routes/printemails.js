var express = require('express');
var Parse = require('parse/node').Parse;
var bodyParser = require('body-parser');
var excel = require('excel4node');
var path = require('path');
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
						var workbook = new excel.Workbook();
						var worksheet = workbook.addWorksheet('Sheet 1');						
						var printHeader = true;
						
						for (var i = 2; i < userEmails.length + 1; i++) {
							var userEmail = userEmails[i];
							var email = "";
							var age = "";
							
							if(userEmail.get("email") !== null && userEmail.get("email") !== undefined && userEmail.get("email") !== "")
								email = userEmail.get("email");
							
							if(userEmail.get("age") !== null && userEmail.get("age") !== undefined && userEmail.get("age") !== "")
								age = userEmail.get("age");				
							
							if (printHeader)
							{
								worksheet.cell(1,1).string('Email');
								worksheet.cell(1,2).string('Age');
								printHeader = false;
							}
															
							if (email !== "")
							{
								worksheet.cell(i,1).string(email);								
							}
							
							if (age !== "")
							{
								worksheet.cell(i,2).string(age);	
							}
						}	
						
						workbook.write('emailsandages.xlsx');
						
						var file = path.join(__dirname, "emailsandages.xlsx");
						
						res.download(file, "emailsandages_" + fileDate + ".xlsx", function (err) {
							   if (err) {
								   console.log("Error");
								   console.log(err);
							   } else {
								   console.log("Success");
							   }
						   });
					}	  
				});
			},
			error : function (error) {
				// The request failed
			}
		});
});