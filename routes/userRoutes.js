const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const pagesController = require("../controllers/pagesController");
const { redirectIfAuthenticated, returnHome } = require("../middleware/auth");

// Rutas relacionadas a los usuarios:
// ...

router.get("/", userController.index);
router.get("/crear", redirectIfAuthenticated, returnHome, pagesController.showRegister);
router.post("/", userController.store);
router.get("/:id", userController.show);
router.get("/:id/editar", userController.edit);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
