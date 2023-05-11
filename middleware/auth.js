function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.session.redirectTo = req.originalUrl;
      res.redirect("/login");
    }
  }

  function redirectIfAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/"); 
    } else {
      return next();
    }
  }
  module.exports = {ensureAuthenticated, redirectIfAuthenticated};