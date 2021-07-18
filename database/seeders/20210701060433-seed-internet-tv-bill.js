"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "internet_tv_bills",
      [
        {
          bill_id: 17,
          customer_number: "9403867584",
          provider: "Indihome",
          bill_fee: 308000,
          admin_fee: 2500,
          late_payment_fee: 0,
          total: 310500,
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
