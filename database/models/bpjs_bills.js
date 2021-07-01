"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bpjs_bills extends Model {
    static associate(models) {
      this.belongsTo(models.Bills, {
        foreignKey: "bill_id",
      });
    }
  }
  Bpjs_bills.init(
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
      va_number: DataTypes.STRING,
      full_name: DataTypes.STRING,
      branch: DataTypes.STRING,
      payment_period: DataTypes.DATE,
      bill: DataTypes.DECIMAL,
      admin_fee: { type: DataTypes.DECIMAL, defaultValue: 2500 },
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Bpjs_bills",
    }
  );
  return Bpjs_bills;
};
