const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../middleware/auth");

const commentController = require("../controllers/commentController");

// Rutas relacionadas a los comentarios:
// ...
//router.get("/article/:id", commentController.create);
router.post("/:id/article", ensureAuthenticated, commentController.store);

module.exports = router;
