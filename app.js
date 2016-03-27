var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var parse = require('parse/node').Parse;

var app = express();
app.use(express.static(__dirname + '/public'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
var routes = require('./routes/index');
var users = require('./routes/users');
var mediaitem = require('./routes/mediaitem');
var mediagroup = require('./routes/mediagroup');
var mediagroupitem = require('./routes/mediagroupitem');
var credit = require('./routes/credit');
var login = require('./routes/login');
app.use(cookieParser());

app.use('/', routes);
app.use('/mediaitem', mediaitem);
app.use('/mediagroup', mediagroup);
app.use('/mediagroupitem', mediagroupitem);
app.use('/credit', credit);
app.use('/login', login);


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

module.exports = app;