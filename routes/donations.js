var express = require('express');
var router = express.Router({ mergeParams: true });

router.get('/', function(req, res, next) {
  res.render('index', { auctions: [] });
});

router.get('/new', function(req, res, next) {
  res.render('index', { auctions: [] });
});

router.post('/new', function(req, res, next) {

});

router.post('/:id/destroy', function(req, res, next) {

});

module.exports = router;
