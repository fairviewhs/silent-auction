module.exports = {
  /**
   * Ensures the given values are in the form (depends on forms.js). The fields are not found, bounces back
   * a response to the user that they are required
   * @param {string[]} required - an array of the names of the required fields
   * @return {function(req, res, next)} - an express function that validates the presence of the fields
   * listed in required
   */
  exists: function(required){
    return function(req, res, next){
      for(i = 0; i < required.length; i++){
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
