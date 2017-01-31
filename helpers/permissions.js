var Auctions = require('../models').Auction;

module.exports = {
  isAdmin: function(id){
    return function(req, res, next){
      if(req.session.user && req.session.user.super_admin){
        next();
      }else{
        Auctions.findById(req.params[id]).then((auction)=>{
          if(auction.isAdmin(req.session.user)){
            next();
          }else{
            res.redirect('/no-perm');
          }
        });
      }
    }
  },
  isSuperAdmin: function(){
    return function(req, res, next){
      if(req.session.user && req.session.user.super_admin){
        next();
      }else if(req.session.user){

      }else{
        res.redirect('/no-perm');
      }
    };
  }
};
