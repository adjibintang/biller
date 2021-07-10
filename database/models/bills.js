"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bills extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: "user_id",
      });

      this.hasOne(models.recurring_billings, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.pln_token_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.pln_tagihan_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.mobile_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.landline_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.internet_tv_bills, {
        foreignKey: "bill_id",
      });

      this.hasMany(models.pdam_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.bpjs_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.transactions, {
        foreignKey: "bill_id",
      });
    }
  }
  bills.init(
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
      bill_type: {
        allowNull: false,
        type: DataTypes.ENUM(
          "Listrik-Token",
          "Listrik-Tagihan",
          "Mobile",
          "Landline",
          "Internet-TV",
          "PDAM",
          "BPJS"
        ),
      },
    },
    {
      sequelize,
      modelName: "bills",
    }
  );
  return bills;
};
