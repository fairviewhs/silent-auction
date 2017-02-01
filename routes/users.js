var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var config = require('../config');
var Admins  = require('../models').Admin;
var Auctions  = require('../models').Auction;
var form = require('../helpers/validator');
var perms = require('../helpers/permissions');

router.get('/users', perms.isSuperAdmin(), function(req, res, next) {
  Admins.findAll({ include: [{ model:Auctions, attributes:['id'] }] }).then((users) => {
    let loopAuctions = function(id, user, callback){
      if(user.Auctions.length > id){
        user.owned_auctions.push(user.Auctions[id].id);
        loopAuctions(id+1, user, callback);
      }else{
        callback();
      }
    };
    let loopUsers = function(id, callback){
      if(users.length > id){
        users[id].owned_auctions = [];
        loopAuctions(0, users[id], ()=>{
          loopUsers(id+1, callback);
        });
      }else{
        callback();
      }
    };
    loopUsers(0, ()=>{
      Auctions.findAll().then((auctions)=>{
        console.log(users);
        res.render('user/index', { users: users, auctions: auctions });
      });
    });

  });
});

router.post('/users/update', perms.isSuperAdmin(), function(req, res, next) {
  Admins.findOne({
    where: { id: req.body.user },
    include: [Auctions]
  }).then((user)=>{
    Auctions.findById(req.body.auction).then((auction)=>{
      let contains = function(id, callback){
        if(user.Auctions.length > id){
          if(user.Auctions[id].id == auction.id){
            callback(true);
          }else{
            contains(id+1, callback);
          }
        }else{
          callback(false);
        }
      }
      contains(0, (found)=>{
        if(!found){
          user.addAuction(auction).then(()=>{
            res.send({success:true});
          });
        }else{
          user.removeAuction(auction).then(()=>{
            res.send({success:true});
          });
        }
      });
    });
  });

});

router.get('/user/confirm/:token', function(req, res, next) {
  Admins.update({
    confirmed_email: true
  },
  {
    where: { confirm_token: req.params.token }
  }).then((usr) => {
    if(req.session.user){
      req.session.user.confirmed = true;
      res.redirect('/');
    }else{
      res.redirect('/login');
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('user/login', { auctions: [] });
});

router.post('/login', form.exists(['email', 'password']), function(req, res, next) {
  Admins.findOne({
    where: {
      email: req.body.email
    },
    attributes: ['id', 'password', 'email', 'name', 'confirmed_email', 'super_admin']
  }).then((user) => {
    if(!user){
      res.send({
        success: false,
        errors: [
          'Invalid username/password'
        ]
      });
      return;
    }
    bcrypt.compare(req.body.password, user.password, function(err, goodPass) {
      if(goodPass){
        req.session.user = {
          name: user.name,
          id: user.id,
          confirmed: user.confirmed_email,
          super_admin: user.super_admin,
          auctions: []
        }
        user.getAuctions().then((auctions)=>{
          let loopAuctions = function(id, callback){
            if(auctions.length > id){
              req.session.user.auctions.push(auctions[id].id);
              loopAuctions(id+1, callback);
            }else{
              callback();
            }
          };
          loopAuctions(0, ()=>{
            res.send({
              success: true,
              message: 'User logged in',
              redir: '/'
            });
          });
        });
      }else{
        res.send({
          success: false,
          errors: [
            'Invalid username/password'
          ]
        });
      }
    });
  });
});

router.get('/register', function(req, res, next) {
  res.render('user/new');
});

router.post('/register', form.exists(['name', 'email', 'password', 'repassword']), function(req, res, next) {
  if(req.body.password !== req.body.repassword){
    res.send({
      success: false,
      errors: [
        'Passwords do not match!'
      ]
    });
    return;
  }
  bcrypt.hash(req.body.password, config.secrets.saltRounds, (err, passHash) => {
    Admins.findOrCreate({
      where: {
        $or: [
          { name: req.body.name },
          { email: req.body.email }
        ]
      },
      attributes: ['id', 'name'],
      defaults: {
        name: req.body.name,
        email: req.body.email,
        password: passHash
      }
    }).spread((usr, isNew) => {
      if(isNew){
        req.session.user = {
          name: usr.name,
          id: usr.id,
          confirmed: usr.confirmed_email,
          super_admin: usr.super_admin,
          auctions: []
        };
        usr.getAuctions().then((auctions)=>{

          let loopAuctions = function(id, callback){
            if(auctions.length < id){
              req.session.user.auctions.push(auctions[id].id);
              loopAuctions(id+1);
            }else{
              callback();
            }
          };
          loopAuctions(0, ()=>{

            res.send({
              success: true,
              message: 'User account created',
              redir: '/'
            });
          });
        });
      }else{
        res.send({
          success: false,
          errors: [
            'User already exists'
          ]
        });
      }
    });
  });
});

router.get('/logout', function(req, res, next) {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;
