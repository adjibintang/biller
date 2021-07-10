"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Packages",
      [
        {
          option_id: 4,
          name: "GamesMax Unlimited",
          price: 50000,
          description: "Lorem",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          option_id: 4,
          name: "OMG Unlimited",
          price: 50000,
          description: "Lorem",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Packages", null, {});
  },
};
