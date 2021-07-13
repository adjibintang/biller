"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Mobile_providers",
      [
        {
          name: "Telkomsel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "XL",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Indosat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Axis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Three",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Smartfren",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Mobile_providers", null, {});
  },
};
