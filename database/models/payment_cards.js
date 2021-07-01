"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment_cards extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: "user_id",
      });

      this.hasMany(models.Credit_cards, {
        foreignKey: "payment_card_id",
      });

      this.hasMany(models.Debit_cards, {
        foreignKey: "payment_card_id",
      });
    }
  }
  Payment_cards.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: DataTypes.INTEGER,
      card_number: { type: DataTypes.STRING, unique: true },
      card_holder_name: DataTypes.STRING,
      expire_date: DataTypes.DATE,
      cvv: DataTypes.STRING,
      type: DataTypes.ENUM("Credit Card", "Debit Card"),
    },
    {
      sequelize,
      modelName: "Payment_cards",
    }
  );
  return Payment_cards;
};
