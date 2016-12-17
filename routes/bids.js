var express = require('express');
var router = express.Router();

router.post('/create', function(req, res, next) {

});

router.post('/:id/destroy', function(req, res, next) {

});

router.get('/', function(req, res, next) {
  res.render('bidders/index', {  });
});

module.exports = router;
