const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const pagesController = require("../controllers/pagesController");

const { ensureAuthenticated, isOwner } = require("../middleware/auth");

// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);

router.get("/crear", ensureAuthenticated, pagesController.showNewArticle);
router.post("/crear", ensureAuthenticated, articleController.create);

router.get("/:id", ensureAuthenticated, pagesController.showArticle);

router.get("/editar/:id", isOwner, articleController.edit);
router.post("/editar/:id", isOwner, articleController.update);

router.get("/delete/:id", isOwner, articleController.destroy);

module.exports = router;
