const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {editComment} = require("../middleware/roles")

const commentController = require("../controllers/commentController");

// Rutas relacionadas a los comentarios:
// ...
router.post("/:id/article", ensureAuthenticated, commentController.store);
router.get("/:id/gestionar", ensureAuthenticated, editComment, commentController.edit);
router.post("/:id/gestionar", ensureAuthenticated, editComment, commentController.update);
module.exports = router;
