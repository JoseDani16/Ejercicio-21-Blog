const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const authController = require("../controllers/authController");

// Rutas relacionadas al panel de control (Admin):
// ...

router.get("/", ensureAuthenticated, articleController.showAdmin);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
