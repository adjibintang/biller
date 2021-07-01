"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("bpjs_bills", {
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
      va_number: {
        type: Sequelize.STRING,
      },
      full_name: {
        type: Sequelize.STRING,
      },
      branch: {
        type: Sequelize.STRING,
      },
      payment_period: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("bpjs_bills");
  },
};
