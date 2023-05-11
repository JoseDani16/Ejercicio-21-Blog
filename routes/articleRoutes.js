const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const {ensureAuthenticated} = require("../middleware/auth");

// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);
router.get("/crear", articleController.showNewArticle);
router.get("/:id", ensureAuthenticated, articleController.showArticle);
router.get("/editar/:id", articleController.edit);
router.post("/editar/:id", articleController.update);
router.get("/delete/:id", articleController.destroy);
//router.post("/", articleController.store);

//nuevo post crear artículo
router.post("/crear/new", articleController.create);

module.exports = router;

//router.get("/:id/editar", articleController.edit);
//router.patch("/:id", articleController.update);
