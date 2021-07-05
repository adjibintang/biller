"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bills extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: "user_id",
      });

      // this.belongsTo(models.Options, {
      //   foreignKey: "option_id",
      // });

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

      this.hasMany(models.internet_tv_bills, {
        foreignKey: "bill_id",
      });

      this.hasOne(models.pdam_bills, {
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
      modelName: "bills",
    }
  );
  return bills;
};
