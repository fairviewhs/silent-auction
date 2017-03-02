var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require("redis");
var helpers = require('express-helpers');
var client  = redis.createClient();
var expressLayouts = require('express-ejs-layouts');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var config = require('./config');
var dateHelper = require('./helpers/dates');
var Admins = require('./models').Admin;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
helpers(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

// set redis to manage sessions (in db 2 not db 0 to avoid conflicts)
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

// Called whenever a page is accessed and checks permissions and sets
// session data for views
app.use(function(req,res,next){
  res.locals.session = req.session;
  res.locals.layout = './layout';
  res.locals.dates = dateHelper;
  if(req.session.user){
    Admins.findById(req.session.user.id).then((user)=>{
      req.session.user.super_admin = user.super_admin;
      req.session.user.confirmed = user.confirmed_email;
      next();
    });
  }else{
    next();
  }
});

// defines the routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));
app.use('/auctions', require('./routes/auctions'));

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
  res.locals.error = process.env.NODE_ENV === 'development' ? err : { status: err.status };

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
