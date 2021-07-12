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
<<<<<<< HEAD
          rates: "R1",
          power: "900V",
          cost_per_kwh: 1000,
=======
          rates: 1,
          power: 500,
>>>>>>> b6c902402841fcbb32fa3cc120009f497da5502a
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
<<<<<<< HEAD
          rates: "R1",
          power: "1000V",
          cost_per_kwh: 1500,
=======
          rates: 1,
          power: 900,
>>>>>>> b6c902402841fcbb32fa3cc120009f497da5502a
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
