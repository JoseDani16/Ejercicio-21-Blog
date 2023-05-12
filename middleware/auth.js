const { Article } = require("../models");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.redirectTo = req.originalUrl;
    return res.redirect("/login");
  }
}
function returnHome(req, res, next) {
  req.session.redirectTo = "/";
  next();
}

async function isOwner(req, res, next) {
  const { userId } = await Article.findByPk(req.params.id);
  if (req.user && req.user.id === userId) {
    return next();
  } else {
    return res.redirect("/");
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

module.exports = {
  ensureAuthenticated,
  redirectIfAuthenticated,
  makeUserAvailableInViews,
  isOwner,
  returnHome,
};
