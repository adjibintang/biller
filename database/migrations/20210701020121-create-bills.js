"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("bills", {
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
      bill_type: {
        allowNull: false,
        type: Sequelize.ENUM(
          "Listrik-Token",
          "Listrik-Tagihan",
          "Mobile",
          "Landline",
          "Internet-TV",
          "PDAM",
          "BPJS"
        ),
      },
      // option_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "Options",
      //     key: "id",
      //   },
      // },
      // date_billed: {
      //   type: Sequelize.DATE,
      // },
      // due_date: {
      //   type: Sequelize.DATE,
      // },
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
    await queryInterface.dropTable("bills");
  },
};
