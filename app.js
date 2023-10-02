const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const sequelize = require("./database");
const usersRouter = require("./routes/users");
const expensesRouter = require("./routes/expenses");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const paymentRouter = require("./routes/payment");
const ordersRouter = require("./routes/orders");
const passwordRouter = require("./routes/password");
const downloadRouter = require("./routes/downloads");
const reportsRouter = require("./routes/reports");
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
const privateKey = fs.readFileSync("server.key");
const certificate = fs.readFileSync("server.cert");
const app = express();
app.use(cors());
app.use(morgan("combined", { stream: accessLogStream }));
// Set up middleware
app.use(express.json());
app.use(helmet());
app.use(compression());

// Set up routes
app.use("/api/users", usersRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/downloads", downloadRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/", passwordRouter);

// Start server
const PORT = process.env.PORT || 5000;
const IP = process.env.DB_IP;
// const server = https.createServer({ privateKey, certificate }, app);

app.listen(PORT, async () => {
  console.log(`Server running on http://${IP}:${PORT}`);
  await sequelize.sync(); // Sync the models with the database
});
