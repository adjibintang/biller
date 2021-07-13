"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bpjs_bills",
      [
        {
          bill_id: 5, // Already Paid
          va_number: "0000385674839",
          full_name: "User Testing",
          branch: "Surabaya",
          payment_period: "2021-07-10 00:00:00",
          total_month: 1,
          bill_fee: 600000,
          admin_fee: 2500,
          total: 602500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 6, // VA Number Non Active
          va_number: "0000382644739",
          full_name: "User Testing 2",
          branch: "Malang",
          payment_period: "2021-05-10 00:00:00",
          total_month: 1,
          bill_fee: 600000,
          admin_fee: 2500,
          total: 602500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bpjs_bills", null, {});
  },
};
