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
        {
          transaction_id: 3, // PDAM Service Not Active
          type: "Bank Transfer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          transaction_id: 4, // PDAM Service Already Paid
          type: "Bank Transfer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          transaction_id: 5, // PDAM Service Late 1 Month
          type: "Bank Transfer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          transaction_id: 6, // PDAM Service Late 2 Month
          type: "Bank Transfer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          transaction_id: 7, // PDAM Service Late 2 Month
          type: "Bank Transfer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("transaction_payments", null, {});
  },
};
