"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mobile_bills extends Model {
    static associate(models) {
      this.belongsTo(models.Bills, {
        foreignKey: "bill_id",
      });
    }
  }
  Mobile_bills.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      bill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Bills",
          key: "id",
        },
      },
      phone_number: DataTypes.STRING,
      provider: DataTypes.STRING,
      package_name: DataTypes.STRING,
      description: DataTypes.TEXT,
      bill: DataTypes.DECIMAL,
      admin_fee: { type: DataTypes.DECIMAL, defaultValue: 1500 },
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Mobile_bills",
    }
  );
  return Mobile_bills;
};
