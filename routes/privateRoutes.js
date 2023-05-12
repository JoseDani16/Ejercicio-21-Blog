const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const { ensureAuthenticated } = require("../middleware/auth");
const {isNotLector, isNotWriter, onlyWriter} = require("../middleware/roles")
const authController = require("../controllers/authController");

// Rutas relacionadas al panel de control (Admin):
// ...
router.get("/", ensureAuthenticated, isNotLector, articleController.showAdmin);
router.get("/logout", ensureAuthenticated, authController.logout);

module.exports = router;
