const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

// Rutas relacionadas al panel de control (Admin):
// ...

router.get("/", ensureAuthenticated, articleController.showAdmin);
router.get("");

module.exports = router;
