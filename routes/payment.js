const express = require("express");
const router = express.Router();
const { checkAuthorization } = require("../controllers/AuthController");
const PaymentController = require("../controllers/PaymentController");

router.post("/", checkAuthorization, PaymentController.collectPayment);

module.exports = router;
