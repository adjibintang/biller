"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Electricities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      meter_number: {
        type: Sequelize.STRING,
        unique: true,
      },
      customer_number: {
        type: Sequelize.STRING,
        unique: true,
      },
      rates: {
        type: Sequelize.STRING,
      },
      power: {
        type: Sequelize.STRING,
      },
      cost_per_kwh: {
        type: Sequelize.DECIMAL,
      },
      last_month_stand_meter: {
        type: Sequelize.INTEGER,
      },
      this_month_stand_meter: {
        type: Sequelize.INTEGER,
      },
      address: {
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
    await queryInterface.dropTable("Electricities");
  },
};
