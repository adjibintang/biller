"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mobile_cards extends Model {
    static associate(models) {
      this.belongsTo(models.Mobile_providers, {
        foreignKey: "mobile_provider_id",
      });

      this.hasOne(models.Mobiles, {
        foreignKey: "mobile_card_id",
      });
    }
  }
  Mobile_cards.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      mobile_provider_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Mobile_providers",
          keys: "id",
        },
      },
      prefix: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Mobile_cards",
    }
  );
  return Mobile_cards;
};
