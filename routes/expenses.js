const express = require("express");
const router = express.Router();
const ExpenseController = require("../controllers/ExpenseController");

router.post("/", ExpenseController.createExpense);

module.exports = router;
