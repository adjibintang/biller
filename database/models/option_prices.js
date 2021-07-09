"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Option_prices extends Model {
    static associate(models) {
      this.belongsTo(models.Options, {
        foreignKey: "option_id",
      });

      this.belongsTo(models.Prices, {
        foreignKey: "price_id",
      });
    }
  }
  Option_prices.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      option_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Options",
          key: "id",
        },
      },
      price_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Prices",
          key: "id",
        },
      },
      provider: {
        type: DataTypes.STRING,
        references:{
          model: "providers",
          key:"name"
        }
      },
      package_name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Option_prices",
    }
  );
  return Option_prices;
};
