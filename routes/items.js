var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/', function(req, res, next) {
  models.Auction.fineAll({ }).then((auctions)=>{
    res.render('index', { auctions: auctions });
  });
});

router.get('/new', function(req, res, next) {
  res.render('items/form', { action: { name: 'new', url: '/new' }, item: { } });
});

//Recive images w/ multer
router.post('/new', function(req, res, next) {

});

router.get('/:id', function(req, res, next) {
  res.render('items/show', { item: item });
});

router.post('/:id/destroy', function(req, res, next) {

});

router.get('/:id/edit', function(req, res, next) {

  res.render('items/form', { action: { name: 'edit', url: '/' + req.params.id + '/edit' }, item: {  } });
});

//Recive images w/ multer
router.post('/:id/edit', function(req, res, next) {

});

module.exports = router;
