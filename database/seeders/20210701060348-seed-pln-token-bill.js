const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "pln_token_bills",
      [
        {
          bill_id: 12,
          meter_number: 1111731145,
          customer_number: 515430213019,
          name: "Lucia Soemadi",
          rates: "R1",
          power: "900V",
          ref: faker.datatype.uuid(),
          kwh: 32,
          stroom_per_token: 46000,
          token: 50000,
          ppj: 3700,
          admin_fee: 1500,
          total: 51200,
          stroom_code: Math.floor(
            100000 + Math.random() * 90000000000000000000
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("pln_token_bills", null, {});
  },
};
