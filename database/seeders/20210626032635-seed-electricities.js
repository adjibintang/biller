const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Electricities",
      [
        {
          name: faker.name.findName(),
          meter_number: faker.datatype.number(),
          customer_number: faker.datatype.number(),
          rates: 1,
          power: 500,
          last_month_stand_meter: 1804,
          this_month_stand_meter: 2054,
          address: faker.address.streetName(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: faker.name.findName(),
          meter_number: faker.datatype.number(),
          customer_number: faker.datatype.number(),
          rates: 1,
          power: 900,
          last_month_stand_meter: 1990,
          this_month_stand_meter: 2100,
          address: faker.address.streetName(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Electricities", null, {});
  },
};
