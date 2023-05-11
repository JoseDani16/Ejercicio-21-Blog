function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.redirectTo = req.originalUrl;
    return res.redirect("/login");
  }
}

function redirectIfAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    return next();
  }
}

function makeUserAvailableInViews(req, res, next) {
  res.locals.user = req.user;
  return next();
}

module.exports = { ensureAuthenticated, redirectIfAuthenticated, makeUserAvailableInViews };
