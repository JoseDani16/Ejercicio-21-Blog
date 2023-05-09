const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");

// Rutas relacionadas a los comentarios:
// ...
//router.get("/article/:id", commentController.create);
router.post("/article/:id", commentController.store);

module.exports = router;
