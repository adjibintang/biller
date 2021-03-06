"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mobiles extends Model {
    static associate(models) {
      this.belongsTo(models.Mobile_cards, {
        foreignKey: "mobile_card_id",
      });
    }
  }
  Mobiles.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      mobile_card_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "mobile_cards",
          key: "id",
        },
      },
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Mobiles",
    }
  );
  return Mobiles;
};
