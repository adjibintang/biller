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
        {
          bill_id: 7, // PDAM Service Not Active
          transaction_date: "2021-03-20 00:00:00",
          status: "Success",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 8, // PDAM Service Already Paid
          transaction_date: "2021-06-20 00:00:00",
          status: "Success",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 9, // PDAM Service Late 1 Month
          transaction_date: "2021-06-20 00:00:00",
          status: "Success",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 10, // PDAM Service Late 2 Month
          transaction_date: "2021-04-20 00:00:00",
          status: "Success",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 11, // PDAM Service Late 2 Month
          transaction_date: "2021-04-20 00:00:00",
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
