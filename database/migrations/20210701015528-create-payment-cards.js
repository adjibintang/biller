"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("payment_cards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      card_number: {
        type: Sequelize.STRING,
        unique: true,
      },
      card_holder_name: {
        type: Sequelize.STRING,
      },
      expire_date: {
        type: Sequelize.DATE,
      },
      cvv: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM("Credit Card", "Debit Card"),
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
    await queryInterface.dropTable("payment_cards");
  },
};
