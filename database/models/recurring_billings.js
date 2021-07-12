"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class recurring_billings extends Model {
    static associate(models) {
      this.belongsTo(models.bills, {
        foreignKey: "bill_id",
      });
    }
  }
  recurring_billings.init(
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
      period: DataTypes.ENUM("Year", "Month", "Week"),
      date_billed: DataTypes.DATE,
      due_date: DataTypes.DATE,
      is_delete: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "recurring_billings",
    }
  );
  return recurring_billings;
};
