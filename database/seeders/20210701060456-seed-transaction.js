"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "transactions",
      [
        {
          bill_id: 1,
          transaction_date: "2021-07-10 00:00:00",
          status: "Success",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 2,
          transaction_date: "2021-05-10 00:00:00",
          status: "Success",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("transactions", null, {});
  },
};
