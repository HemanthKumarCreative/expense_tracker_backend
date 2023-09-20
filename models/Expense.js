const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");

const Expense = sequelize.define("expenses", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Expense.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Expense, { foreignKey: "user_id" });

module.exports = Expense;
