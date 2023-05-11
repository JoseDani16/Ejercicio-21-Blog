const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const { redirectIfAuthenticated } = require("../middleware/auth");
const { makeUserAvailableInViews } = require("../middleware/auth");

// Rutas relacionadas a la parte pública del sitio web:
// ...
router.get("/", pagesController.showHome);
router.get("/api/articulos", pagesController.showApi);
//router.get("/article/:id", pagesController.showArticle);
/*
router.get("/crear", (req, res) => {
  res.render("newArticle");
});
*/
router.get("/registro", redirectIfAuthenticated, pagesController.register);
router.post("/registro", pagesController.addUser);
router.get("/login", redirectIfAuthenticated, pagesController.showLogin);
//router.post("/login", authController.login);

module.exports = router;
