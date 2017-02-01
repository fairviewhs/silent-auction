var express = require('express');
var router = express.Router();
var Auctions  = require('../models').Auction;
var Admins  = require('../models').Admin;

router.get('/', function(req, res, next) {
  Auctions.findAll({
  }).then((auctions)=>{
    if(req.session.user){
      Admins.findOne({ where: { id: req.session.user.id } }).then((user)=>{
        user.getAuctions().then((usrAuctions)=>{
          res.render('index', { auctions: auctions, user: { auctions: usrAuctions } });
        });
      });
    }else{
      res.render('index', { auctions: auctions });
    }
  });
});

router.get('/no-perm', function(req, res, next) {
  res.render('error', { message: "You can't go there!", status: "403 forbidden" });
});

module.exports = router;
