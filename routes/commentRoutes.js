const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {manageComment} = require("../middleware/roles")

const commentController = require("../controllers/commentController");

// Rutas relacionadas a los comentarios:
// ...
router.post("/:id/article", ensureAuthenticated, commentController.store);
router.get("/:id/gestionar", ensureAuthenticated, manageComment, commentController.edit);
router.post("/:id/gestionar", ensureAuthenticated, manageComment, commentController.update);
router.get("/:id/eliminar", ensureAuthenticated, manageComment, commentController.destroy);
module.exports = router;
