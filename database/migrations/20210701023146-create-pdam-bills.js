"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pdam_bills", {
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
      customer_number: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      period: {
        type: Sequelize.DATE,
      },
      last_month_stand_meter: {
        type: Sequelize.INTEGER,
      },
      this_month_stand_meter: {
        type: Sequelize.INTEGER,
      },
      usage: {
        type: Sequelize.INTEGER,
      },
      bill: {
        type: Sequelize.DECIMAL,
      },
      admin_fee: {
        type: Sequelize.DECIMAL,
      },
      ppn: {
        type: Sequelize.DECIMAL,
      },
      stamp_cost: {
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
    await queryInterface.dropTable("pdam_bills");
  },
};
