var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('user/index', { users: [] });
});

router.get('/register', function(req, res, next) {
  res.render('user/new', { auctions: [] });
});

module.exports = router;
