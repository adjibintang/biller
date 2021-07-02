"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pln_tagihan_bills extends Model {
    static associate(models) {
      this.belongsTo(models.bills, {
        foreignKey: "bill_id",
      });
    }
  }
  pln_tagihan_bills.init(
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
      rates: DataTypes.STRING,
      power: DataTypes.STRING,
      tagihan_date: DataTypes.DATE,
      last_month_stand_meter: DataTypes.INTEGER,
      this_month_stand_meter: DataTypes.INTEGER,
      bill_fee: DataTypes.DECIMAL,
      admin_fee: { type: DataTypes.DECIMAL, defaultValue: 3000 },
      late_payment_fee: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "pln_tagihan_bills",
      tableName: "pln_tagihan_bills"
    }
  );
  return pln_tagihan_bills;
};
