"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    static associate(models) {
      this.hasOne(models.Transaction_payments, {
        foreignKey: "transaction_id",
      });

      this.belongsTo(models.bills, {
        foreignKey: "bill_id",
      });
    }
  }
  transactions.init(
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
      transaction_date: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM("Process", "Success", "Failed"),
        defaultValue: "Process",
      },
    },
    {
      sequelize,
      modelName: "transactions",
    }
  );
  return transactions;
};
