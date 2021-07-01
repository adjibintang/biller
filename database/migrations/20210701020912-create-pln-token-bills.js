"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pln_token_bills", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bill_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "bills",
          key: "id",
        },
      },
      meter_number: {
        type: Sequelize.STRING,
      },
      customer_number: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      rates: {
        type: Sequelize.STRING,
      },
      power: {
        type: Sequelize.STRING,
      },
      ref: {
        type: Sequelize.STRING,
      },
      kwh: {
        type: Sequelize.DECIMAL,
      },
      stroom_per_token: {
        type: Sequelize.DECIMAL,
      },
      token: {
        type: Sequelize.DECIMAL,
      },
      ppj: {
        type: Sequelize.DECIMAL,
      },
      admin_fee: {
        type: Sequelize.DECIMAL,
      },
      total: {
        type: Sequelize.DECIMAL,
      },
      stroom_code: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pln_token_bills");
  },
};
