const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);
router.get("/crear", articleController.showNewArticle);
//router.post("/", articleController.store);
router.get("/:id", articleController.showArticle);
router.get("/editar/:id", articleController.editArticle);
router.get("/:id/editar", articleController.edit);
router.patch("/:id", articleController.update);
router.delete("/:id", articleController.destroy);

module.exports = router;
