var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var config = require('../config');
var Admins  = require('../models').Admin;
var form = require('../helpers/validator');

router.get('/users', function(req, res, next) {
  Admins.findAll().then((users) => {
    res.render('user/index', { users: users });
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
    attributes: ['id', 'password', 'email']
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
        }
        res.send({
          success: true,
          message: 'User logged in',
          redir: '/'
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
        password: passHash,
      }
    }).spread((usr, isNew) => {
      if(isNew){
        req.session.user = {
          name: usr.name,
          id: usr.id
        };
        res.send({
          success: true,
          message: 'User account created',
          redir: '/'
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
