"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Options extends Model {
    static associate(models) {
      this.belongsTo(models.Services, {
        foreignKey: "service_id",
      });

      this.hasMany(models.Option_prices, {
        foreignKey: "option_id",
      });

      // this.hasMany(models.Bills, {
      //   foreignKey: "option_id",
      // });
    }
  }
  Options.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      service_id: {
        references: {
          model: "Services",
          key: "id",
        },
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: DataTypes.STRING,
      image_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Options",
    }
  );
  return Options;
};
