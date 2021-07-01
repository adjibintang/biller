"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Mobiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mobile_card_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Mobile_cards",
          key: "id",
        },
      },
      phone_number: {
        type: Sequelize.STRING,
        unique: true,
      },
      post_payment_fee: {
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable("Mobiles");
  },
};
