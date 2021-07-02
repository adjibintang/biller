"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bills extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: "user_id",
      });

      // this.belongsTo(models.Options, {
      //   foreignKey: "option_id",
      // });

      this.hasOne(models.Recurring_billings, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.Pln_token_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.Pln_tagihan_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.Mobile_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.Landline_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.Internet_tv_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.Pdam_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.Bpjs_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.Transactions, {
        foreignKey: "bill_id",
      });
    }
  }
  Bills.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      // option_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "Options",
      //     key: "id",
      //   },
      // },
      // date_billed: DataTypes.DATE,
      // due_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Bills",
      tableName: "bills"
    }
  );
  return Bills;
};
