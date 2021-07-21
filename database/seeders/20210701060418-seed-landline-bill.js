"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "landline_bills",
      [
        {
          bill_id: 16,
          phone_number: "02314032045",
          bill_fee: 90000,
          admin_fee: 2500,
          late_payment_fee: 0,
          total: 92500,
          period: new Date("2021-06-20"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 25,
          phone_number: "02314032045",
          bill_fee: 90000,
          admin_fee: 2500,
          late_payment_fee: 0,
          total: 92500,
          period: new Date("2021-06-20"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("landline_bills", null, {});
  },
};
