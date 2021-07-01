"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Internet_tvs extends Model {
    static associate(models) {
      // define association here
    }
  }
  Internet_tvs.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      customer_number: { type: DataTypes.STRING, unique: true },
      provider: DataTypes.STRING,
      abonemen: {
        type: DataTypes.DECIMAL,
      },
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Internet_tvs",
    }
  );
  return Internet_tvs;
};
