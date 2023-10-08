const express = require("express");
const router = express.Router();
const ExpenseController = require("../controllers/ExpenseController");
const { checkAuthorization } = require("../controllers/AuthController");

router.post("/", checkAuthorization, ExpenseController.createExpense);
router.get("/:user_id", checkAuthorization, ExpenseController.getAllExpenses);
router.delete("/:id", checkAuthorization, ExpenseController.deleteExpense);

module.exports = router;
