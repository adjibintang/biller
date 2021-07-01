"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Bpjss", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      va_number: {
        type: Sequelize.STRING,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      branch: {
        type: Sequelize.STRING,
      },
      family_member: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM("Kelas I", "Kelas II", "Kelas III"),
      },
      cost: {
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
    await queryInterface.dropTable("Bpjss");
  },
};
