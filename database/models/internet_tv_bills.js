"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class internet_tv_bills extends Model {
    static associate(models) {
      this.belongsTo(models.bills, {
        foreignKey: "bill_id",
      });
    }
  }
  internet_tv_bills.init(
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
      customer_number: DataTypes.STRING,
      provider: DataTypes.STRING,
      bill_fee: DataTypes.DECIMAL,
      admin_fee: { type: DataTypes.DECIMAL, defaultValue: 2500 },
      late_payment_fee: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "internet_tv_bills",
    }
  );
  return internet_tv_bills;
};
