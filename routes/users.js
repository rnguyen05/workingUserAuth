var express = require('express');
var router  = express.Router();

var passport = require("../config/passport");
var users_controller = require('../controllers/users_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");
var isLoggedIn = require("../config/middleware/isLoggedIn");



// router.get('/', isLoggedIn, function(req, res) {
// 	res.render('index', {
// 		title:'Welcome to Fool',
// 		loggedIn:req.loggedIn
// 	});
// });
// router.get('/login', isLoggedIn, function(req, res) {
// 	if(req.loggedIn) res.redirect('/');
// 	console.log(req.loggedIn);
// 	res.render('login', {
// 		title:'Login/Registration'
// 	});
// });


//Local Authentication
router.get('/signup', users_controller.registrationPage);

router.get('/sign-out', users_controller.signOutUser);

router.post('/login', passport.authenticate("local"), users_controller.loginUser);

router.post('/signup', users_controller.signUpUser);


//Facebook Authentication
//router.get('/login/facebook', passport.authenticate('facebook'));

//Callback url
// router.get('/login', passport.authenticate('facebook',//), users_controller.fbLoginUser);
// //user_controller....
// { failureRedirect: '/login' }),
// function(req, res) {
//     res.redirect('/');
// });

// router.get('/profile',
// require('connect-ensure-login').ensureLoggedIn(),
// function(req, res){
//     res.render('profile', { user: req.user });
// });


router.get('/auth/facebook', isLoggedIn, passport.authenticate('facebook'));
//router.get('/auth/facebook', passport.authenticate('facebook', {scope:"email"}));
// router.get('/auth/facebook',
// passport.authenticate('facebook', { scope: ['email']}),
//     function(req, res){
//         console.log(req);
// });
// router.get('/auth/facebook/callback', function(request, response, next) {
//     passport.authenticate('facebook', {scope: ['profile', 'email']})(request, response, next);
// });

router.get('/', passport.authenticate('facebook', 
                { successRedirect: '/', failureRedirect: '/login' }));


// router.get('/login', isLoggedIn, function(req, res) {
// 	if(req.loggedIn) res.redirect('/');
// 	console.log(req.loggedIn);
// 	res.render('login', {
// 		title:'Login/Registration'
// 	});
// });










module.exports = router;