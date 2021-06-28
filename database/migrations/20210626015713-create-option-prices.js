"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Option_prices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      option_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Options",
          key: "id",
        },
      },
      price_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Prices",
          key: "id",
        },
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
    await queryInterface.dropTable("Option_prices");
  },
};
