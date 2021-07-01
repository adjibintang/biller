"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Internet_tv_bills extends Model {
    static associate(models) {
      this.belongsTo(models.Bills, {
        foreignKey: "bill_id",
      });
    }
  }
  Internet_tv_bills.init(
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
      provider: DataTypes.STRING,
      bill: DataTypes.DECIMAL,
      admin_fee: { type: DataTypes.DECIMAL, defaultValue: 2500 },
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Internet_tv_bills",
    }
  );
  return Internet_tv_bills;
};
