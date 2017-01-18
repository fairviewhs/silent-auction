var express = require('express');
var router = express.Router();
var Auctions  = require('../models').Auction;
var Admins  = require('../models').Admin;
var Items  = require('../models').Item;
var perms = require('../helpers/permissions');
var form = require('../helpers/validator');

router.get('/new', perms.isAdmin(), function(req, res, next) {
  res.render('auctions/form', { action: { name: 'New', url: 'new' }, auction: { } });
});

router.post('/new', form.exists(['name', 'host', 'description', 'start_time', 'end_time']),
  perms.isAdmin(), function(req, res, next) {
  Auctions.findOrCreate({
    where: {
      name: req.body.name
    },
    defaults: {
      name: req.body.name,
      host: req.body.host,
      description: req.body.name,
      start_time: req.body.start_time,
      end_time: req.body.end_time
    }
  }).spread((auction, isNew) => {
    if(isNew){
      Admins.findOne({ where: { id: req.session.user.id } }).then((admin) => {
        admin.addAuction(auction).then(()=>{
          res.send({
            success: true,
            redir: '/',
            message: 'Auction created!'
          });
        });
      });
    }else{
      res.send({
        success: false,
        errors: [
          "Auction by that name already exists"
        ]
      });
    }
  });
});

router.get('/:id/edit', function(req, res, next) {
  Auctions.findOne({
    where: { id: req.params.id }
  }).then((auction)=>{
    res.render('auctions/form', { action: { name: 'edit', url: '/' + req.params.id + '/edit' }, auction: auction });
  });
});

router.post('/:id/edit', function(req, res, next) {

});

router.use('/:auctionId/bids', require('./bids'));

router.get('/:id', function(req, res, next) {
  Auctions.findOne({
    where: { id: req.params.id },
    include: [Items]
  }).then((auction)=>{
    console.log(auction);
    res.render('auctions/show', { auction: auction });
  });
});

module.exports = router;
