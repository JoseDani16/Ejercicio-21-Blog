const { Article, User } = require("../models");
const bcrypt = require("bcryptjs");
const { findByPk } = require("../models/User");

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

function ownerProfile (req, res, next){
  if (req.user.id === req.params.id*1){
    next();
  }else{
    req.flash("perms", "No tiene los permisos para ingresar al perfil");
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

async function checkPassword (req, res, next){
  const id = req.user.id;
  const {actualPassword} = req.body;
  const {password} = await User.findByPk(id);
  const match = await bcrypt.compare(actualPassword, password)
  
  if (match){
    next();
  }else{
    req.flash("perms", "la contraseña es incorrecta");
        return res.redirect("back");
  }
}

module.exports = {
  ensureAuthenticated,
  redirectIfAuthenticated,
  makeUserAvailableInViews,
  isOwner,
  returnHome,
  ownerProfile,
  checkPassword,
};
