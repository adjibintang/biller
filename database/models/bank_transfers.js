"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bank_transfers extends Model {
    static associate(models) {
      this.belongsTo(models.transaction_payments, {
        foreignKey: "transaction_payment_id",
      });

      this.belongsTo(models.biller_bank_accounts, {
        foreignKey: "bank_destination_id",
      });
    }
  }
  bank_transfers.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      transaction_payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "transactions",
          key: "id",
        },
      },
      bank_destination_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "biller_bank_accounts",
          key: "id",
        },
      },
      account_name: DataTypes.STRING,
      account_number: {
        type: DataTypes.STRING,
        allowNull: false},
      account_bank: DataTypes.STRING,
      receipt_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "bank_transfers",
      tableName: "bank_transfers"
    }
  );
  return bank_transfers;
};
