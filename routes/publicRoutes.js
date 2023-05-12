const express = require("express");
const router = express.Router();

const pagesController = require("../controllers/pagesController");
const { redirectIfAuthenticated, returnHome } = require("../middleware/auth");
const authController = require("../controllers/authController");

// Rutas relacionadas a la parte pública del sitio web:
// ...
router.get("/", returnHome, pagesController.showHome);
router.get("/login", redirectIfAuthenticated, pagesController.showLogin);
router.post("/login", authController.login);
module.exports = router;
