const express = require("express");
const router = express.Router();
const ExpenseController = require("../controllers/ExpenseController");

router.post("/", ExpenseController.createExpense);
router.get("/:user_id", ExpenseController.getAllExpenses);
router.delete("/:id", ExpenseController.deleteExpense);

module.exports = router;
