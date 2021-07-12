"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bank_transfers",
      [
        {
          transaction_payment_id: 1,
          bank_destination_id: 1,
          account_name: null,
          account_number: null,
          account_bank: null,
          receipt_url: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          transaction_payment_id: 2,
          bank_destination_id: 1,
          account_name: null,
          account_number: null,
          account_bank: null,
          receipt_url: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    //await queryInterface.bulkDelete("People", null, {});
  },
};
