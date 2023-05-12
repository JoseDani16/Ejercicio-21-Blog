const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const pagesController = require("../controllers/pagesController");

const { ensureAuthenticated, isOwner } = require("../middleware/auth");
const{editArticles, deleteArticles}=require("../middleware/roles")

// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);

router.get("/crear", ensureAuthenticated, pagesController.showNewArticle);
router.post("/crear", ensureAuthenticated, articleController.create);

router.get("/:id", ensureAuthenticated, pagesController.showArticle);

router.get("/editar/:id", ensureAuthenticated, editArticles, articleController.edit);
router.post("/editar/:id",  ensureAuthenticated, editArticles, articleController.update);

router.get("/delete/:id", ensureAuthenticated, deleteArticles, articleController.destroy);

module.exports = router;
