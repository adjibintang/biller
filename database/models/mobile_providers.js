"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mobile_providers extends Model {
    static associate(models) {
      this.hasMany(models.Mobile_cards, {
        foreignKey: "mobile_provider_id",
      });
    }
  }
  Mobile_providers.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Mobile_providers",
    }
  );
  return Mobile_providers;
};
