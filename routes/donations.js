var express = require('express');
var router = express.Router({ mergeParams: true });
var Donations  = require('../models').Donation;
var Auctions  = require('../models').Auction;
var Users  = require('../models').User;
var form = require('../helpers/validator');

router.post('/create', form.exists(['email', 'amount', 'name', 'phone']), function(req, res, next) {
  if(req.body.amount > 0){
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
      user.createDonation({
        amount: req.body.amount
      }).then((don)=>{
        Auctions.findById(req.params.auctionId).then((auction)=>{
          auction.addDonation(don).then(()=>{
            req.session.bidder = {
              name: user.name,
              email: user.email,
              phone: user.phone
            };
            res.send({
              success: true,
              redir: auction.get_path()
            });
          });
        });
      });
    });
  }else{
    res.send({
      success: false,
      errors: ['Amount must be more than zero!']
    });
  }
});

router.get('/:id/delete', function(req, res, next) {
  Donations.destroy({ where: { id: req.params.id } }).then((donations)=>{
    res.redirect('/auctions/'+req.params.auctionId);
  });
});

module.exports = router;
