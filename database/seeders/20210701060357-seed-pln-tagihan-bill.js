const faker = require("faker");
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "pln_tagihan_bills",
      [
        {
          bill_id: 1,
          customer_number: faker.datatype.number(),
          name: faker.name.findName(),
          rates: "R1",
          power: "900V",
          tagihan_date: new Date(),
          last_month_stand_meter: 1804,
          this_month_stand_meter: 2054,
          bill_fee: 350000,
          admin_fee: 3000,
          late_payment_fee: 0,
          total: 353000,
          createdAt: new Date(),
          updatedAt: new Date(),
          
        },

        {
          bill_id: 2,
          customer_number: faker.datatype.number(),
          name: faker.name.findName(),
          rates: "R1",
          power: "1000V",
          tagihan_date: new Date(),
          last_month_stand_meter: 1990,
          this_month_stand_meter: 2100,
          bill_fee: 480000,
          admin_fee: 3000,
          late_payment_fee: 0,
          total: 483000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("pln_tagihan_bills", null, {});
  },
};
