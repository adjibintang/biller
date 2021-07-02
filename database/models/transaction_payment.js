"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction_payments extends Model {
    static associate(models) {
      this.belongsTo(models.transactions, {
        foreignKey: "transaction_id",
      });

      this.hasOne(models.bank_transfers, {
        foreignKey: "transaction_payment_id",
      });

      this.hasOne(models.credit_cards, {
        foreignKey: "transaction_payment_id",
      });

      this.hasOne(models.debit_cards, {
        foreignKey: "transaction_payment_id",
      });
    }
  }
  transaction_payments.init(
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
          model: "transactions",
          key: "id",
        },
      },
      type: DataTypes.ENUM("Bank Transfer", "Credit Card", "Debit Card"),
    },
    {
      sequelize,
      modelName: "transaction_payments",
      tableName: "transaction_payments"
    }
  );
  return transaction_payments;
};
