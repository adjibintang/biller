"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class biller_bank_accounts extends Model {
    static associate(models) {
      this.hasMany(models.bank_transfers, {
        foreignKey: "bank_destination_id",
      });
    }
  }
  biller_bank_accounts.init(
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
      modelName: "biller_bank_accounts",
      tableName: "biller_bank_accounts"
    }
  );
  return biller_bank_accounts;
};
