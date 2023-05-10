const {passport, passportConfig } = require ("../config/passport")

function login(req, res) {
passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
})   
}

module.exports = {login}