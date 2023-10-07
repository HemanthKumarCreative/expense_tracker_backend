const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");

const Password = sequelize.define("passwords", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Password.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Password, { foreignKey: "user_id" });

module.exports = Password;
