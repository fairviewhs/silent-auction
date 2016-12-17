var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { auctions: [] });
});

router.get('/new', function(req, res, next) {
  res.render('items/form', { auctions: [] });
});

//Recive images w/ multer
router.post('/new', function(req, res, next) {

});

router.get('/:id', function(req, res, next) {
  res.render('items/show', { auctions: [] });
});

router.post('/:id/destroy', function(req, res, next) {

});

router.get('/:id/edit', function(req, res, next) {
  res.render('items/form', { auctions: [] });
});

//Recive images w/ multer
router.post('/:id/edit', function(req, res, next) {

});

module.exports = router;
