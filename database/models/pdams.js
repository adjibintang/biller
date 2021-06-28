"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pdams extends Model {
    static associate(models) {
      this.belongsTo(models.Cities, {
        foreignKey: "city_id",
      });
    }
  }
  Pdams.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      city_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Cities",
          key: "id",
        },
      },
      name: DataTypes.STRING,
      customer_number: DataTypes.STRING,
      last_month_stand_meter: DataTypes.INTEGER,
      this_month_stand_meter: DataTypes.INTEGER,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pdams",
    }
  );
  return Pdams;
};
