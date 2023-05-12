const { Article, User } = require("../models");

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
async function isOwnerOrAdmin(req, res, next) {
  const { id } = await User.findByPk(req.params.id);
  if ((req.user && req.user.id === id) || (req.user && req.user.levelPermission >= 4)) {
    return next();
  } else {
    return res.redirect("/");
  }
}

function levelPermisionWriter(req, res, next) {
  if (req.user && req.user.levelPermission >= 2) {
    return next();
  } else {
    return res.redirect("/");
  }
}

function levelPermisionEditor(req, res, next) {
  if (req.user && req.user.levelPermission >= 3) {
    return next();
  } else {
    return res.redirect("/");
  }
}

function levelPermisionAdmin(req, res, next) {
  if (req.user && req.user.levelPermission === 4) {
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
  levelPermisionWriter,
  levelPermisionEditor,
  levelPermisionAdmin,
  isOwnerOrAdmin,
};
