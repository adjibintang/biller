"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Landlines extends Model {
    static associate(models) {
      // define association here
    } 
  }
  Landlines.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      telephone_number: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Landlines",
    }
  );
  return Landlines;
};
