var express = require('express');
var Parse = require('parse/node').Parse;
var router = express.Router();
module.exports = router;

router.get('/anything', function(req, res) {
   console.log('any other path');
});