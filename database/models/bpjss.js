"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bpjss extends Model {
    static associate(models) {
      // define association here
    }
  }
  Bpjss.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      va_number: DataTypes.STRING,
      name: DataTypes.STRING,
      branch: DataTypes.STRING,
      family_member: DataTypes.INTEGER,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bpjss",
      freezeTableName: true,
    }
  );
  return Bpjss;
};
