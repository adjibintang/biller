"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    static associate(models) {
      this.hasOne(models.Pdams, {
        foreignKey: "city_id",
      });
    }
  }
  Cities.init(
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
      modelName: "Cities",
    }
  );
  return Cities;
};
