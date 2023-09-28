const Expense = require("../models/Expense");
const User = require("../models/User");

const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);

    const user = await User.findByPk(req.body.user_id); // Assuming you have the user's ID
    const updatedTotalExpenses =
      parseInt(user.total_expenses) + parseInt(req.body.amount);

    await user.update({ total_expenses: updatedTotalExpenses });

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllExpenses = async (req, res) => {
  const { user_id } = req.params; // Extract user_id from params
  const page = req.query.page || 1; // Get the requested page from query params
  const pageSize = 3; // Set the page size to 3 records per page

  try {
    const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
    const expenses = await Expense.findAndCountAll({
      where: { user_id }, // Filter expenses by user_id
      limit: pageSize,
      offset: offset,
    });
    const totalPages = Math.ceil(expenses.count / pageSize); // Calculate total pages
    res.status(200).json({
      expenses: expenses.rows,
      currentPage: page,
      totalPages: totalPages,
    });
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

    const user = await User.findByPk(expense.user_id); // Assuming you have the user's ID
    const updatedTotalExpenses =
      parseInt(user.total_expenses) - parseInt(expense.amount);

    await user.update({ total_expenses: updatedTotalExpenses });

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
