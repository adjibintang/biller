"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    static associate(models) {
      this.hasOne(models.Transaction_payment, {
        foreignKey: "transaction_id",
      });

      this.belongsTo(models.Bills, {
        foreignKey: "bill_id",
      });
    }
  }
  Transactions.init(
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
      transaction_date: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM("Process", "Success", "Failed"),
        defaultValue: "Process",
      },
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
