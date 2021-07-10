"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    static associate(models) {
      this.hasMany(models.Options, {
        foreignKey: "service_id",
        onDelete: "cascade",
      });
    }
  }
  Services.init(
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
      modelName: "Services",
    }
  );
  return Services;
};
