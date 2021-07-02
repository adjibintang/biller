"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_payments extends Model {
    static associate(models) {
      this.belongsTo(models.Transactions, {
        foreignKey: "transaction_id",
      });

      this.hasOne(models.Bank_transfers, {
        foreignKey: "transaction_payment_id",
      });

      this.hasOne(models.Credit_cards, {
        foreignKey: "transaction_payment_id",
      });

      this.hasOne(models.Debit_cards, {
        foreignKey: "transaction_payment_id",
      });
    }
  }
  Transaction_payments.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Transactions",
          key: "id",
        },
      },
      type: DataTypes.ENUM("Bank Transfer", "Credit Card", "Debit Card"),
    },
    {
      sequelize,
      modelName: "Transaction_payments",
      tableName: "transaction_payments"
    }
  );
  return Transaction_payments;
};
