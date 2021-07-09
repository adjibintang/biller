"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payment_cards extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: "user_id",
      });

      this.hasMany(models.credit_cards, {
        foreignKey: "payment_card_id",
      });

      this.hasMany(models.debit_cards, {
        foreignKey: "payment_card_id",
      });
    }
  }
  payment_cards.init(
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
      modelName: "payment_cards",
    }
  );
  return payment_cards;
};
