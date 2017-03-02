var Auctions = require('../models').Auction;


module.exports = {
  /**
   * Ensures that the currently requesting user has admin privilages to the given auction
   * @param {int} id - the name of the field within the reqest where the id is stored for
   * the auction
   * @return {function()} - an exress compatible function for parsing the request and
   * redirecting in the case of failure
   */
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
  /**
   * Checks if the user is a super admin and thus has access to all auctions
   * @return {function()} - an exress compatible function for parsing the request and
   * redirecting in the case of failure
   */
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
