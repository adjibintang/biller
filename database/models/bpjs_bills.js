"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bpjs_bills extends Model {
    static associate(models) {
      this.belongsTo(models.bills, {
        foreignKey: "bill_id",
      });
    }
  }
  bpjs_bills.init(
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
      va_number: DataTypes.STRING,
      full_name: DataTypes.STRING,
      branch: DataTypes.STRING,
      payment_period: DataTypes.DATE,
      total_month: DataTypes.INTEGER,
      bill_fee: DataTypes.DECIMAL,
      admin_fee: { type: DataTypes.DECIMAL, defaultValue: 2500 },
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "bpjs_bills",
    }
  );
  return bpjs_bills;
};
