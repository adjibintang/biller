"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("landline_bills", {
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
      phone_number: {
        type: Sequelize.STRING,
      },
      bill: {
        type: Sequelize.DECIMAL,
      },
      admin_fee: {
        type: Sequelize.DECIMAL,
      },
      total: {
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
    await queryInterface.dropTable("landline_bills");
  },
};
