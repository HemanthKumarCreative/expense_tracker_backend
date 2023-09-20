const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expense_app", "hemanth", "Byjus@12", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
