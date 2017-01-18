module.exports = {
  isAdmin: function(){
    return function(req, res, next){
      if(req.session.user.id){
        next();
      }else{
        res.redirect('/no-perm');
      }
    }
  }
};
