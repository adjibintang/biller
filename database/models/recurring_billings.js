"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recurring_billings extends Model {
    static associate(models) {
      this.belongsTo(models.Bills, {
        foreignKey: "bill_id",
      });
    }
  }
  Recurring_billings.init(
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
      period: DataTypes.ENUM("Year", "Month", "Week"),
      date_billed: DataTypes.DATE,
      due_date: DataTypes.DATE,
      is_delete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Recurring_billings",
      tableName: "recurring_billings"
    }
  );
  return Recurring_billings;
};
