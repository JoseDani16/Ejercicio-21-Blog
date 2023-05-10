const { passport } = require("../config/passport");

function login(req, res) {
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/admin/login",
  })(req, res);
}

module.exports = { login };
