var express = require('express');
var router = express.Router({ mergeParams: true });
var multer  = require('multer');
var form = require('../helpers/validator');
var Items  = require('../models').Item;
var Auctions  = require('../models').Auction;
var upload = multer({ dest: 'public/images/uploads' });

router.get('/', function(req, res, next) {
  Auctions.findOne({
    where: { id: req.params.auctionId },
    include: [Items]
  }).then((auction)=>{
    console.log(auction);
    res.render('items/index', { auction: auction });
  });
});

router.get('/new', function(req, res, next) {
  res.render('items/form', { action: { name: 'new', url: '' }, item: { } });
});

//Recive images w/ multer
router.post('/new', upload.any(), function(req, res, next) {
  Items.findOrCreate({
    where: { id: req.session.editing },
    defaults: { }
  }).spread((item, isNew)=>{
     if(req.get('Image')){
       req.session.editing = item.id;
       item['picture'+(req.get('Image')==1?'':req.get('Image'))+'_file_name'] = req.files[0].filename;
       item.save().then(()=>{
         res.send(200);
       });
     }else{
       if(req.body.name && req.body.price && req.body.desc &&
          item.picture_file_name && item.picture2_file_name &&
          item.picture3_file_name){
         item.update({
           name: req.body.name,
           price: req.body.price,
           description: req.body.desc
         }).then(()=>{
           Auctions.findOne({ where: { id: req.params.auctionId } }).then((auction)=>{
             auction.addItem(item).then(()=>{
               res.send({
                 success: true,
                 redir: '../..'
               });
             });
           });
         });
       }else{
         res.send({
           success: false,
           errors: ['All fields are required!']
         });
       }
     }
  });
});

router.get('/:id', function(req, res, next) {
  Items.findOne({ where: { id: req.params.id } }).then((item)=>{
    res.render('items/show', { item: item });
  });
});

router.get('/:id/delete', function(req, res, next) {

});

router.get('/:id/edit', function(req, res, next) {
  Items.findOne({ where: { id: req.params.id } }).then((item)=>{
    res.render('items/form', { action: { name: 'edit', url: './' }, item: item });
  });
});

//Recive images w/ multer
router.post('/:id/edit', function(req, res, next) {

});

module.exports = router;
