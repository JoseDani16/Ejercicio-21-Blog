//const session = require("express-session");

function ensureAuthenticated(req, res, next){
    console.log(req);
    if (req.isAutenticated()){
        return next();
    } else {
        req.session.redirectTo = req.query.redirectTo;
        res.redirect("/login");
    }
}

module.exports = ensureAuthenticated;