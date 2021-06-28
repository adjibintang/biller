"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Option_prices",
      [
        {
          option_id: 1,
          price_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 1,
          price_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 1,
          price_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 1,
          price_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 1,
          price_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 1,
          price_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 1,
          price_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 1,
          price_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 3,
          price_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 3,
          price_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 3,
          price_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 3,
          price_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 3,
          price_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 3,
          price_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 3,
          price_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 3,
          price_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Option_prices", null, {});
  },
};
