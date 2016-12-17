var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  res.render('index', { auctions: [] });
});

router.get('/new', function(req, res, next) {
  res.render('auctions/form', { auctions: [] });
});

router.post('/new', function(req, res, next) {
});

router.get('/:id/edit', function(req, res, next) {
  res.render('auctions/form', { auctions: [] });
});

router.post('/:id/edit', function(req, res, next) {

});

router.use('/:auctionId/bids', require('./bids'));

module.exports = router;
