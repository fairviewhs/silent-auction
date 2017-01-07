var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { auctions: [] });
});

router.get('/login', function(req, res, next) {
  res.render('user/login', { auctions: [] });
});

module.exports = router;
