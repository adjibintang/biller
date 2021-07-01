"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Electricities extends Model {
    static associate(models) {
      // define association here
    }
  }
  Electricities.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      meter_number: { type: DataTypes.STRING, unique: true },
      customer_number: { type: DataTypes.STRING, unique: true },
      rates: DataTypes.STRING,
      power: DataTypes.STRING,
      cost_per_kwh: {
        type: DataTypes.DECIMAL,
      },
      last_month_stand_meter: DataTypes.INTEGER,
      this_month_stand_meter: DataTypes.INTEGER,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Electricities",
    }
  );
  return Electricities;
};
