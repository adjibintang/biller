"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Prices",
      [
        {
          price: 20000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 50000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 100000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 200000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 500000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 1000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 5000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 10000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Prices", null, {});
  },
};
