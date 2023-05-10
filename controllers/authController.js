const { passport } = require("../config/passport");

function login(req, res) {
  
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  })(req, res);
  
}

function logout(req, res) {
  
  req.session.destroy(()=>{res.redirect('/')});

}

module.exports = { login, logout };
