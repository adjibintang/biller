"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Internet_tvs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      customer_number: {
        type: Sequelize.STRING,
        unique: true,
      },
      provider: {
        type: Sequelize.STRING,
      },
      abonemen: {
        type: Sequelize.DECIMAL,
      },
      address: {
        type: Sequelize.STRING,
      },
      period: {
        type: Sequelize.DATE,
      },
      payment_due: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Internet_tvs");
  },
};
