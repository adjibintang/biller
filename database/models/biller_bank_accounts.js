"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Biller_bank_accounts extends Model {
    static associate(models) {
      this.hasMany(models.Bank_transfers, {
        foreignKey: "bank_destination_id",
      });
    }
  }
  Biller_bank_accounts.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      account_name: DataTypes.STRING,
      account_number: { type: DataTypes.STRING, unique: true },
      account_bank: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Biller_bank_accounts",
    }
  );
  return Biller_bank_accounts;
};
