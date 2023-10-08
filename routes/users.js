const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { checkAuthorization } = require("../controllers/AuthController");

router.post("/", checkAuthorization, UserController.createUser);
router.get("/", checkAuthorization, UserController.getAllUsers);
router.get("/get-user/:userId", checkAuthorization, UserController.getUserById);

module.exports = router;
