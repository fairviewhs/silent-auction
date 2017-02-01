var express = require('express');
var itemBidRoutes = express.Router({ mergeParams: true });
var auctionBidRoutes = express.Router({ mergeParams: true });
var form = require('../helpers/validator');
var Items  = require('../models').Item;
var Auctions  = require('../models').Auction;
var Users  = require('../models').User;
var Bids  = require('../models').Bid;

itemBidRoutes.post('/create', form.exists(['email', 'bid_price', 'name', 'phone']), function(req, res, next) {
  Items.findOne({
    where: { id: req.params.itemId},
    include: [Bids, Auctions]
  }).then((item)=>{
    if(req.body.bid_price >= (item.Bids.length > 0 ? item.Bids[item.Bids.length-1].amount+10 : item.price)){
      Users.findOrCreate({
        where: {
          email: req.body.email,
          name: req.body.name
         },
        defaults: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone
        }
      }).spread((user, isNew)=>{
        user.createBid({
          amount: req.body.bid_price
        }).then((bid)=>{
          item.addBid(bid).then(()=>{
            req.session.bidder = {
              name: user.name,
              email: user.email,
              phone: user.phone
            };
            res.send({
              success: true,
              redir: item.get_path()
            });
          });
        });
      });
    }else{
      res.send({
        success: false,
        errors: ['Your bid is not high enough!']
      });
    }
  });
});

itemBidRoutes.get('/:id/delete', function(req, res, next) {
  Bids.destroy({ where: { id: req.params.id } }).then(()=>{
    Items.findOne({
      where: { id: req.params.itemId},
      include: [Auctions]
    }).then((item)=>{
      res.redirect(item.bidders_path());
    });
  });
});

auctionBidRoutes.get('/:id/delete', function(req, res, next) {
  Bids.destroy({ where: { id: req.params.id } }).then(()=>{
    Auctions.findById(req.params.auctionId).then((auc)=>{
      res.redirect(auc.bidders_path());
    });
  });
});

auctionBidRoutes.get('/', function(req, res, next) {
  Auctions.findOne({
    where: { id: req.params.auctionId },
    include: [{
      model: Items,
      include: [{
        model: Bids,
        include: [Users]
      }]
    }]
  }).then((auction)=>{
    let luckyItem = auction.Items[Math.floor(Math.random()*auction.Items.length)];
    let luckyBidder = luckyItem.Bids[Math.floor(Math.random()*luckyItem.Bids.length)];
    res.render('bidders/index', {
      auction: auction,
      back: { name: 'Auction', path: auction.get_path() }
      // luckyWinner: luckyBidder
    });
  });
});

itemBidRoutes.get('/', function(req, res, next) {
  Items.findOne({
    where: { id: req.params.itemId },
    include: [Auctions, {
      model: Bids,
      include: [Users]
    }]
  }).then((item)=>{
    let luckyBidder = item.Bids[Math.floor(Math.random()*item.Bids.length)];
    res.render('bidders/index', {
      item: item,
      back: { name: 'Item', path: item.get_path() },
      luckyWinner: luckyBidder
    });
  });
});

module.exports = {
  items: itemBidRoutes,
  auctions: auctionBidRoutes
};
