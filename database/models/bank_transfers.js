"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bank_transfers extends Model {
    static associate(models) {
      this.belongsTo(models.Transaction_payments, {
        foreignKey: "transaction_payment_id",
      });

      this.belongsTo(models.Biller_bank_accounts, {
        foreignKey: "bank_destination_id",
      });
    }
  }
  Bank_transfers.init(
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
          model: "Transactions",
          key: "id",
        },
      },
      bank_destination_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Biller_bank_accounts",
          key: "id",
        },
      },
      account_name: DataTypes.STRING,
      account_number: DataTypes.STRING,
      account_bank: DataTypes.STRING,
      receipt_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bank_transfers",
      tableName: "bank_transfers"
    }
  );
  return Bank_transfers;
};
