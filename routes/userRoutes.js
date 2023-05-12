const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const pagesController = require("../controllers/pagesController");
const { ensureAuthenticated, redirectIfAuthenticated, returnHome } = require("../middleware/auth");
const {onlyAdmin} = require("../middleware/roles");

// Rutas relacionadas a los usuarios:
// ...

router.get("/admindelete",ensureAuthenticated, onlyAdmin, userController.adminDestroy);
router.get("/", ensureAuthenticated, onlyAdmin, userController.adminIndex);
router.post("/permisos", ensureAuthenticated, onlyAdmin, userController.changePerms);
router.get("/crear", redirectIfAuthenticated, returnHome, pagesController.showRegister);
router.post("/", userController.store);
router.get("/:id", userController.show);
router.get("/:id/editar", userController.edit);
router.post("/:id", ensureAuthenticated, onlyAdmin, userController.update);
router.delete("/:id", userController.destroy);


module.exports = router;
