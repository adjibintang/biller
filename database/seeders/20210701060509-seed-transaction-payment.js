"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "transaction_payments",
      [
        {
          transaction_id: 1,
          type: "Bank Transfer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          transaction_id: 2,
          type: "Bank Transfer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("People", null, {});
  },
};
