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
      va_number: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: DataTypes.STRING,
      branch: DataTypes.STRING,
      family_member: DataTypes.INTEGER,
      type: {
        type: DataTypes.ENUM("Kelas I", "Kelas II", "Kelas III"),
      },
      cost: {
        type: DataTypes.DECIMAL,
      },
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bpjss",
    }
  );
  return Bpjss;
};
