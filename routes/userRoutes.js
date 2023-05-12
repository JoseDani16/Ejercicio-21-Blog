const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const pagesController = require("../controllers/pagesController");
const {
  redirectIfAuthenticated,
  returnHome,
  levelPermisionAdmin,
  isOwnerOrAdmin,
} = require("../middleware/auth");

// Rutas relacionadas a los usuarios:
// ...

router.get("/crear", redirectIfAuthenticated, returnHome, pagesController.showRegister);
router.post("/", userController.store);
//router.get("/:id", userController.show);
//router.get("/:id/editar", levelPermisionAdmin, userController.edit);
router.post("/:id/editar", levelPermisionAdmin, userController.update);
router.get("/:id", isOwnerOrAdmin, userController.destroy);

module.exports = router;
