"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transaction_payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "transactions",
          key: "id",
        },
      },
      type: {
        type: Sequelize.ENUM("Bank Transfer", "Credit Card", "Debit Card"),
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
    await queryInterface.dropTable("transaction_payments");
  },
};
