"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pln_tagihan_bills extends Model {
    static associate(models) {
      this.belongsTo(models.Bills, {
        foreignKey: "bill_id",
      });
    }
  }
  Pln_tagihan_bills.init(
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
      customer_number: DataTypes.STRING,
      name: DataTypes.STRING,
      rates: DataTypes.STRING,
      power: DataTypes.STRING,
      tagihan_date: DataTypes.DATE,
      last_month_stand_meter: DataTypes.INTEGER,
      this_month_stand_meter: DataTypes.INTEGER,
      bill: DataTypes.DECIMAL,
      admin_fee: { type: DataTypes.DECIMAL, defaultValue: 3000 },
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Pln_tagihan_bills",
    }
  );
  return Pln_tagihan_bills;
};
