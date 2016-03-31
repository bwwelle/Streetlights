var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Parse = require('parse/node').Parse;
//var passport = require('passport');
//var flash = require('connect-flash');
var session = require('express-session');
//var assert = require('assert');
//var env = require('node-env-file');

var mediaitem = require('./routes/mediaitem');
var mediagroup = require('./routes/mediagroup');
var mediagroupitem = require('./routes/mediagroupitem');
var credit = require('./routes/credit');

var app = express();
var router = express.Router();

// Use this if node env is development or != production
//env(__dirname + '/config/.env');


// You need to use the cookieParser here rather than later.
app.use(cookieParser(session({
		secret : process.env.SESSION_SECRET || 'thisissomethingthatnooneknows',
		resave : true,
		saveUninitialized : true
	})));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
var urlencodedParser = bodyParser.urlencoded({
		extended : false
	});

app.use(bodyParser.json());
app.use(bodyParser.json({
		type : 'application/vnd.api+json'
	}));

app.use(bodyParser()); // get information from html forms

app.use(morgan('dev')); // log every request to the console

app.use(express.static(__dirname + '/public'));
//app.use(flash()); // use connect-flash for flash messages stored in session
Parse.initialize(process.env.ParseApplicationID, process.env.ParseJavascriptID);

// Authentication and Authorization Middleware
var auth = function (req, res, next) {
	if (req.session && req.session.user === Parse.User.current() && req.session.admin)
		return next();
	else
		return res.render('login','');
};

// Login endpoint
app.post('/login', urlencodedParser, function (req, res) {
	if (!req.body.username || !req.body.password) {
		res.render('login', '');
	} else {
		Parse.User.logIn(req.body.username, req.body.password).then(
			function (user) {
			//req.session.user = user;
			//req.session.admin = true;
			res.render('index', {title:'',data: user}); //when successfully logged in
		});
	};
});

// Logout endpoint
app.get('/logout', function (req, res) {
	//req.session.destroy();
	res.render('login', '');
});

// Get content endpoint
app.get('/', auth, function (req, res) {
	res.render('index', ''); //when successfully logged in
});

app.use('/mediaitem', mediaitem);
app.use('/mediagroup', mediagroup);
app.use('/mediagroupitem', mediagroupitem);
app.use('/credit', credit);

// error handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {}
	});
});

module.exports = app;
