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
      customer_number: { type: DataTypes.STRING, unique: true },
      last_month_stand_meter: DataTypes.INTEGER,
      this_month_stand_meter: DataTypes.INTEGER,
      fixed_cost: {
        type: DataTypes.DECIMAL,
      },
      stand_meter_maintenance_cost: {
        type: DataTypes.DECIMAL,
      },
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pdams",
    }
  );
  return Pdams;
};
