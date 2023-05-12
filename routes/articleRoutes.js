const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const pagesController = require("../controllers/pagesController");

const {
  ensureAuthenticated,
  isOwner,
  levelPermisionWriter,
  levelPermisionEditor,
  levelPermisionAdmin,
} = require("../middleware/auth");

// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);

router.get("/crear", ensureAuthenticated, pagesController.showNewArticle);
router.post("/crear", levelPermisionWriter, ensureAuthenticated, articleController.create);

router.get("/:id", ensureAuthenticated, pagesController.showArticle);

router.get("/editar/:id", levelPermisionWriter, isOwner, articleController.edit);
router.post("/editar/:id", levelPermisionWriter, isOwner, articleController.update);
router.get("/editar/:id/editor", levelPermisionEditor, articleController.edit);
router.post("/editar/:id/editor", levelPermisionEditor, articleController.update);

router.get("/delete/:id", levelPermisionWriter, isOwner, articleController.destroy);
router.get("/delete/:id/editor", levelPermisionEditor, articleController.destroy);

module.exports = router;
