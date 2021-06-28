"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Cities",
      [
        {
          name: "Surabaya",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Malang",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Cities", null, {});
  },
};
