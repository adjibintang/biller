"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Options",
      [
        {
          service_id: 1,
          name: "PLN - Token",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 1,
          name: "PLN - Tagihan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 2,
          name: "Pulsa(pre-paid)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 2,
          name: "Internet(pre-paid)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 2,
          name: "Pasca baya(post-paid)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 3,
          name: "Indihome",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 3,
          name: "MNC Play",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 3,
          name: "Biznet Home",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Options", null, {});
  },
};
