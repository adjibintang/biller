"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class debit_cards extends Model {
    static associate(models) {
      this.belongsTo(models.transaction_payments, {
        foreignKey: "transaction_payment_id",
      });

      this.belongsTo(models.payment_cards, {
        foreignKey: "payment_card_id",
      });
    }
  }
  debit_cards.init(
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
      payment_card_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "payment_cards",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "debit_cards",
    }
  );
  return debit_cards;
};
