const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");

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
router.get("/registro", pagesController.register)
router.post("/registro", pagesController.addUser)

module.exports = router;
