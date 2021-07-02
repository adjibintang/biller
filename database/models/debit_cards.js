"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Debit_cards extends Model {
    static associate(models) {
      this.belongsTo(models.Transaction_payments, {
        foreignKey: "transaction_payment_id",
      });

      this.belongsTo(models.Payment_cards, {
        foreignKey: "payment_card_id",
      });
    }
  }
  Debit_cards.init(
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
      payment_card_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Payment_cards",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Debit_cards",
    }
  );
  return Debit_cards;
};