const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPremiumUser: false,
  isSignedIn: false,
  total_expenses: {
    type: DataTypes.BIGINT,
  },
});

module.exports = User;
