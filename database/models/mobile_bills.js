"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mobile_bills extends Model {
    static associate(models) {
      this.belongsTo(models.bills, {
        foreignKey: "bill_id",
      });
    }
  }
  mobile_bills.init(
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
          model: "bills",
          key: "id",
        },
      },
      phone_number: DataTypes.STRING,
      provider: DataTypes.STRING,
      package_name: DataTypes.STRING,
      description: DataTypes.TEXT,
      bill_fee: DataTypes.DECIMAL,
      admin_fee: { type: DataTypes.DECIMAL, defaultValue: 1500 },
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "mobile_bills",
    }
  );
  return mobile_bills;
};
