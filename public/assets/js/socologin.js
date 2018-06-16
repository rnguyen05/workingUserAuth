$(document).ready(function() {
    function isLoggedIn(req, res, next) {
        req.loggedIn = !!req.user;
        next();
    };
});