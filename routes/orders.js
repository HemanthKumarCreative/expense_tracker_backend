// routes/orders.js
const express = require("express");
const router = express.Router();
const { checkAuthorization } = require("../controllers/AuthController");
const ordersController = require("../controllers/OrdersController");

router.post("/", checkAuthorization, ordersController.createOrder);

module.exports = router;
