"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("bank_transfers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      transaction_payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "transaction_payments",
          key: "id",
        },
      },
      bank_destination_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "biller_bank_accounts",
          key: "id",
        },
      },
      account_name: {
        type: Sequelize.STRING,
      },
      account_number: {
        type: Sequelize.STRING,
      },
      account_bank: {
        type: Sequelize.STRING,
      },
      receipt_url: {
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
    await queryInterface.dropTable("bank_transfers");
  },
};
