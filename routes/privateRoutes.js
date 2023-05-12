const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const { ensureAuthenticated } = require("../middleware/auth");
const authController = require("../controllers/authController");

// Rutas relacionadas al panel de control (Admin):
// ...

router.get("/", ensureAuthenticated, articleController.showAdmin);
router.get("/logout", ensureAuthenticated, authController.logout);

module.exports = router;
