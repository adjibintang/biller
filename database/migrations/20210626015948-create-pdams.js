"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Pdams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      city_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Cities",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      customer_number: {
        type: Sequelize.STRING,
      },
      last_month_stand_meter: {
        type: Sequelize.INTEGER,
      },
      this_month_stand_meter: {
        type: Sequelize.INTEGER,
      },
      fixed_cost: {
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable("Pdams");
  },
};
