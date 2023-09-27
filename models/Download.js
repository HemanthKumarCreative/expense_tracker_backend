const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");

const Download = sequelize.define("downloads", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  file_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Download.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Download, { foreignKey: "user_id" });

module.exports = { Download };
