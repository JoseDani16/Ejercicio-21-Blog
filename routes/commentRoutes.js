const express = require("express");
const router = express.Router();
const { ensureAuthenticated, levelPermisionEditor } = require("../middleware/auth");

const commentController = require("../controllers/commentController");

// Rutas relacionadas a los comentarios:
// ...
router.post("/:id/article", ensureAuthenticated, commentController.store);
router.post("/:id/editor", levelPermisionEditor, commentController.update);

module.exports = router;
