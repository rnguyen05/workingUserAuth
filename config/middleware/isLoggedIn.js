

//Social Login validations
module.exports = function isLoggedIn(req, res, next) {
	req.loggedIn = !!req.user;
	next();
}