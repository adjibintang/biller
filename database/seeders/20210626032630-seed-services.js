"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Services",
      [
        {
          name: "Electricity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mobile",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Internet & TV",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Landline",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bpjs",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PDAM",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Services", null, {});
  },
};
