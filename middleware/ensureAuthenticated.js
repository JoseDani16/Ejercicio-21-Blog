//const session = require("express-session");

function ensureAuthenticated(req, res, next){
    if (req.isAutenticated()){
        return next();
    } else {
        req.session.redirectTo = req.query.redirectTo;
        res.redirect("/login");
    }
}

module.exports = ensureAuthenticated;