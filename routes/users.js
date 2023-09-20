const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);

module.exports = router;
