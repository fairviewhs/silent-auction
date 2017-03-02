var express = require('express');
var router = express.Router({ mergeParams: true });
var multer  = require('multer');
var form = require('../helpers/validator');
var Items  = require('../models').Item;
var Auctions  = require('../models').Auction;
var Bids  = require('../models').Bid;
var Users  = require('../models').User;
var upload = multer({ dest: 'public/images/uploads' });
var perms = require('../helpers/permissions');
var form = require('../helpers/validator');

router.get('/', function(req, res, next) {
  Auctions.findOne({
    where: { id: req.params.auctionId },
    include: [Items]
  }).then((auction)=>{
    console.log(auction);
    res.render('items/index', { auction: auction });
  });
});

router.get('/new', perms.isAdmin('auctionId'), function(req, res, next) {
  res.render('items/form', { action: { name: 'New', url: 'new', submit: 'Create' }, item: { } });
});

// Called both when the item is fully submitted and when a user uploads and images to attach to the item,
// updates the item with additional images and form data as it is submitted. Tracks the users currenct
// edit with `req.session.editing = item.id;`
router.post('/new', perms.isAdmin('auctionId'), upload.any(), function(req, res, next) {
  Items.findOrCreate({
    where: { id: req.session.editing },
    defaults: { }
  }).spread((item, isNew)=>{
    req.session.editing = item.id;
    if(req.get('Image')){
      item['picture'+(req.get('Image')==1?'':req.get('Image'))+'_file_path'] = req.files[0].filename;
      item['picture'+(req.get('Image')==1?'':req.get('Image'))+'_file_name'] = req.files[0].originalname;
      item.save().then(()=>{
       res.send(200);
      });
    }else{
      if(req.body.name && req.body.price && req.body.desc &&
        (item.picture_file_name || item.picture2_file_name ||
        item.picture3_file_name)){
       item.update({
         name: req.body.name,
         price: req.body.price,
         description: req.body.desc
       }).then(()=>{
         Auctions.findOne({ where: { id: req.params.auctionId } }).then((auction)=>{
           auction.addItem(item).then(()=>{
             delete req.session.editing;
             res.send({
               success: true,
               redir: auction.get_path()
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

router.use('/:itemId/bids', require('./bids').items);

router.get('/:id', function(req, res, next) {
  Items.findOne({
    where: { id: req.params.id },
    include: [
      Auctions,
      {
        model: Bids,
        include: [Users]
      }
    ]
  }).then((item)=>{
    res.render('items/show', { item: item });
  });
});

router.get('/:id/delete', perms.isAdmin('auctionId'), function(req, res, next) {
  Items.destroy({
    where: {
      id: req.params.id
    },
    include: [Auctions]
  }).then((item)=>{
    res.redirect(item.Auction.get_path());
  });
});

router.get('/:id/edit', perms.isAdmin('auctionId'), function(req, res, next) {
  Items.findById(req.params.id).then((item)=>{
    res.render('items/form', { action: { name: 'Edit', url: 'edit', submit: 'Update' }, item: item });
  });
});

// Called both when the item is fully submitted and when a user uploads and images to attach to the item,
// updates the item with additional images and form data as it is submitted. Tracks the users currenct
// edit with `req.session.editing = item.id;`
router.post('/:id/edit', perms.isAdmin('auctionId'), upload.any(), function(req, res, next) {
  Items.findById(req.params.id).then((item)=>{
    if(req.get('Image')){
      item['picture'+(req.get('Image')==1?'':req.get('Image'))+'_file_path'] = req.files[0].filename;
      item['picture'+(req.get('Image')==1?'':req.get('Image'))+'_file_name'] = req.files[0].originalname;
      item.save().then(()=>{
        res.send(200);
      });
    }else{
      if(req.body.name && req.body.price && req.body.desc &&
        (item.picture_file_name || item.picture2_file_name ||
        item.picture3_file_name)){
       item.update({
         name: req.body.name,
         price: req.body.price,
         description: req.body.desc
       }).then(()=>{
         item.getAuction().then((auction)=>{
           res.send({
             success: true,
             redir: auction.get_path()
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


module.exports = router;
