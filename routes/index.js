var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { auctions: [] });
});

router.get('/no-perm', function(req, res, next) {
  res.render('error', { message: "You can't go there!", status: "403 forbidden" });
});

module.exports = router;
