const Expense = require("../models/Expense");

const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllExpenses = async (req, res) => {
  const { user_id } = req.params; // Extract user_id from params

  try {
    const expenses = await Expense.findAll({
      where: { user_id }, // Filter expenses by user_id
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  try {
    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.destroy();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  deleteExpense,
};
