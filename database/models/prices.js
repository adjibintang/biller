"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prices extends Model {
    static associate(models) {
      this.hasMany(models.Option_prices, {
        foreignKey: "price_id",
      });
    }
  }
  Prices.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
    },
    {
      sequelize,
      modelName: "Prices",
    }
  );
  return Prices;
};
