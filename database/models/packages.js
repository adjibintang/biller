"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Packages extends Model {
    static associate(models) {
      this.belongsTo(models.Options, {
        foreignKey: "option_id",
      });
    }
  }
  Packages.init(
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
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Packages",
    }
  );
  return Packages;
};
