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
        {
          transaction_payment_id: 3, // PDAM Service Not Active
          bank_destination_id: 1,
          account_name: null,
          account_number: null,
          account_bank: null,
          receipt_url: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          transaction_payment_id: 4, // PDAM Service Already Paid
          bank_destination_id: 1,
          account_name: null,
          account_number: null,
          account_bank: null,
          receipt_url: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          transaction_payment_id: 5, // PDAM Service Late 1 Month
          bank_destination_id: 1,
          account_name: null,
          account_number: null,
          account_bank: null,
          receipt_url: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          transaction_payment_id: 6, // PDAM Service Late 2 Month
          bank_destination_id: 1,
          account_name: null,
          account_number: null,
          account_bank: null,
          receipt_url: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          transaction_payment_id: 7, // PDAM Service Late 2 Month
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
    await queryInterface.bulkDelete("bank_transfers", null, {});
  },
};
