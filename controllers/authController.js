const {passport, passportConfig } = require ("../config/passport")

function login(req, res) {
passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
})(req,res)  
}

module.exports = {login}