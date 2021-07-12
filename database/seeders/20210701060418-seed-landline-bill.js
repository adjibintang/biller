"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "landline_bills",
      [
        {
          bill_id: 0,
          phone_number: faker.phone.phoneNumber(),
          bill_fee: 108000,
          admin_fee: 2500,
          late_payment_fee: 0,
          total: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("landline_bills", null, {});
  },
};
