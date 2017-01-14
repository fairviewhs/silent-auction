var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require("redis");
var client  = redis.createClient();
var expressLayouts = require('express-ejs-layouts');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var config = require('./config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: client,
    db:2,
    saveUninitialized: false,
    resave: false,
    logErrors: true
  }),
  secret: config.secrets.sessions
}));

app.use(function(req,res,next){
  res.locals.session = req.session;
  res.locals.layout = './layout';
  next();
});

app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));
app.use('/items', require('./routes/items'));
app.use('/auctions', require('./routes/auctions'));
app.use('/donations', require('./routes/donations'));
app.use('/bids', require('./routes/bids'));

// devise_for :admins, :controllers => { registrations: 'registrations' }
// get 'items/:id/bidders' => 'items#bidders', as: :item_bidders
// get 'auctions/:id/bidders' => 'auctions#bidders', as: :auction_bidders

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
