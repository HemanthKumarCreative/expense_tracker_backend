const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/get-user/:userId", UserController.getUserById);

module.exports = router;
