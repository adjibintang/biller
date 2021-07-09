"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "biller_bank_accounts",
      [
        {
          account_name: "Biller Indonesia",
          account_number: "7583748596",
          account_bank: "BCA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          account_name: "Biller Indonesia",
          account_number: "9387638927",
          account_bank: "Mandiri",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          account_name: "Biller Indonesia",
          account_number: "3643374347",
          account_bank: "BNI",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("biller_bank_accounts", null, {});
  },
};
