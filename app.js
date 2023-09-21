const express = require("express");
const cors = require("cors");

const sequelize = require("./database");
const usersRouter = require("./routes/users");
const expensesRouter = require("./routes/expenses");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const paymentRouter = require("./routes/payment");

const app = express();
app.use(cors());

// Set up middleware
app.use(express.json());

// Set up routes
app.use("/api/users", usersRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/payment", paymentRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await sequelize.sync(); // Sync the models with the database
});
