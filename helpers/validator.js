module.exports = {
  exists: function(required){
    return function(req, res, next){
      for(i = 0; i < required.length; i++){
        console.log("checking", required[i]);
        if(req.body[required[i]]==""){
          res.send({
            success: false,
            errors: [
              required[i] + ' is a required field'
            ]
          });
          return;
        }
      }
      next();
    }
  }
}
