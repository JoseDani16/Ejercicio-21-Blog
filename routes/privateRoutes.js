const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const {
  ensureAuthenticated,
  levelPermisionWriter,
  levelPermisionAdmin,
} = require("../middleware/auth");
const authController = require("../controllers/authController");
const pagesController = require("../controllers/pagesController");

// Rutas relacionadas al panel de control (Admin):
// ...

router.get("/", ensureAuthenticated, levelPermisionWriter, articleController.showAdmin);
router.get("/logout", ensureAuthenticated, authController.logout);
router.get("/users", levelPermisionAdmin, pagesController.showEditUsers);
module.exports = router;
