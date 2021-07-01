"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pln_token_bills extends Model {
    static associate(models) {
      this.belongsTo(models.Bills, {
        foreignKey: "bill_id",
      });
    }
  }
  Pln_token_bills.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      bill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Bills",
          key: "id",
        },
      },
      meter_number: DataTypes.STRING,
      customer_number: DataTypes.STRING,
      name: DataTypes.STRING,
      rates: DataTypes.STRING,
      power: DataTypes.STRING,
      ref: DataTypes.STRING,
      kwh: DataTypes.DECIMAL,
      stroom_per_token: DataTypes.DECIMAL,
      token: DataTypes.DECIMAL,
      ppj: DataTypes.DECIMAL,
      admin_fee: { type: DataTypes.DECIMAL, defaultValue: 1500 },
      total: DataTypes.DECIMAL,
      stroom_code: { type: DataTypes.STRING, unique: true },
    },
    {
      sequelize,
      modelName: "Pln_token_bills",
    }
  );
  return Pln_token_bills;
};
