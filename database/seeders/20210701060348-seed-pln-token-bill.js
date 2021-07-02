const faker = require("faker");
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "pln_token_bills",
      [
        {
          bill_id: 5,
          meter_number: faker.datatype.number(),
          customer_number: faker.datatype.number(),
          name: faker.name.findName(),
          rates: "R1",
          power: "2200V",
          ref: faker.datatype.uuid(),
          kwh: 32.1,
          stroom_per_token: 0,
          token: 0,
          ppj: 0,
          admin_fee: 1500,
          // late_payment_fee: 0,
          total: 0,
          stroom_code: "2000 1234 5678 2233 4455",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("pln_token_bills", null, {});
  },
};
