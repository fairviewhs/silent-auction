var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/:id', function(req, res, next) {
  models.Auction.fineOne({
    where: { id: req.params.id },
    include: [{
      model: models.Item
    }]
  }).then((auction)=>{
    res.render('index', { auction: auction });
  });
});

router.get('/new', function(req, res, next) {
  res.render('auctions/form', { action: { name: 'new', url: '/new' }, auction: { } });
});

router.post('/new', function(req, res, next) {
});

router.get('/:id/edit', function(req, res, next) {
  models.Auctions.findOne({
    where: { id: req.params.id }
  }).then((auction)=>{
    res.render('auctions/form', { action: { name: 'edit', url: '/' + req.params.id + '/edit' }, auction: auction });
  });
});

router.post('/:id/edit', function(req, res, next) {

});

router.use('/:auctionId/bids', require('./bids'));

module.exports = router;
