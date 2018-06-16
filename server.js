
// Dependencies
// ============
const express        = require('express');
const path           = require('path');
const logger         = require('morgan');
const bodyParser     = require('body-parser');
const session        = require('express-session'); 
const passport       = require("./config/passport");
const config         = require("./config/extra-config");
// Express settings
// ================

// instantiate our app
const app            = express();

//allow sessions
app.use(session({ secret: 'booty Mctootie', cookie: { maxAge: 60000 }}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var isAuth         = require("./config/middleware/isAuthenticated");
var authCheck      = require('./config/middleware/attachAuthenticationStatus');
var isLoggedin     = require("./config/middleware/isLoggedIn");

console.log("isAuth ", isAuth);
console.log("authCheck ", authCheck);
console.log("isLoggedin", isLoggedin);



// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});





// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: config.sessionKey, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(authCheck);


require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  })
});


// our module get's exported as app.
module.exports = app;



// var express = require('express');
// var passport = require('passport');
// var Strategy = require('passport-facebook').Strategy;


// // Configure the Facebook strategy for use by Passport.
// //
// // OAuth 2.0-based strategies require a `verify` function which receives the
// // credential (`accessToken`) for accessing the Facebook API on the user's
// // behalf, along with the user's profile.  The function must invoke `cb`
// // with a user object, which will be set at `req.user` in route handlers after
// // authentication.
// passport.use(new Strategy({
//     clientID: "202065647087620",
//     clientSecret: "77c213b28e805272002ed465854d3cca",
//     callbackURL: 'http://localhost:3000/login/facebook/return'
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // In this example, the user's Facebook profile is supplied as the user
//     // record.  In a production-quality application, the Facebook profile should
//     // be associated with a user record in the application's database, which
//     // allows for account linking and authentication with other identity
//     // providers.
//     return cb(null, profile);
//   }));


// // Configure Passport authenticated session persistence.
// //
// // In order to restore authentication state across HTTP requests, Passport needs
// // to serialize users into and deserialize users out of the session.  In a
// // production-quality application, this would typically be as simple as
// // supplying the user ID when serializing, and querying the user record by ID
// // from the database when deserializing.  However, due to the fact that this
// // example does not have a database, the complete Facebook profile is serialized
// // and deserialized.
// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });


// // Create a new Express application.
// var app = express();

// // Configure view engine to render EJS templates.
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// // Use application-level middleware for common functionality, including
// // logging, parsing, and session handling.
// app.use(require('morgan')('combined'));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// // Initialize Passport and restore authentication state, if any, from the
// // session.
// app.use(passport.initialize());
// app.use(passport.session());

// require('./routes')(app);

// // // Define routes.
// // app.get('/',
// //   function(req, res) {
// //     res.render('home', { user: req.user });
// //   });

// // app.get('/login',
// //   function(req, res){
// //     res.render('login');
// //   });

// // app.get('/login/facebook',
// //   passport.authenticate('facebook'));

// // app.get('/login/facebook/return', 
// //   passport.authenticate('facebook', { failureRedirect: '/login' }),
// //   function(req, res) {
// //     res.redirect('/');
// //   });

// // app.get('/profile',
// //   require('connect-ensure-login').ensureLoggedIn(),
// //   function(req, res){
// //     res.render('profile', { user: req.user });
// //   });

// app.listen(3000);
