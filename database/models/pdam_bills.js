"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pdam_bills extends Model {
    static associate(models) {
      this.belongsTo(models.bills, {
        foreignKey: "bill_id",
      });
    }
  }
  pdam_bills.init(
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
      name: DataTypes.STRING,
      period: DataTypes.DATE,
      total_month: DataTypes.INTEGER,
      last_month_stand_meter: DataTypes.INTEGER,
      this_month_stand_meter: DataTypes.INTEGER,
      usage: DataTypes.INTEGER,
      bill_fee: DataTypes.DECIMAL,
      admin_fee: { type: DataTypes.DECIMAL, defaultValue: 2500 },
      ppn: DataTypes.DECIMAL,
      stamp_cost: DataTypes.DECIMAL,
      late_payment_fee: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "pdam_bills",
    }
  );
  return pdam_bills;
};
