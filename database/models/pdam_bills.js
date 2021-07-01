"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pdam_bills extends Model {
    static associate(models) {
      this.belongsTo(models.Bills, {
        foreignKey: "bill_id",
      });
    }
  }
  Pdam_bills.init(
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
      period: DataTypes.DATE,
      last_month_stand_meter: DataTypes.INTEGER,
      this_month_stand_meter: DataTypes.INTEGER,
      usage: DataTypes.INTEGER,
      bill: DataTypes.DECIMAL,
      admin_fee: { type: DataTypes.DECIMAL, defaultValue: 2500 },
      ppn: DataTypes.DECIMAL,
      stamp_cost: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Pdam_bills",
    }
  );
  return Pdam_bills;
};
