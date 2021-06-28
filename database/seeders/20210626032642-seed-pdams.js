const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Pdams",
      [
        {
          city_id: 1,
          name: faker.name.findName(),
          customer_number: "65748394854",
          last_month_stand_meter: 300,
          this_month_stand_meter: 400,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          city_id: 2,
          name: faker.name.findName(),
          customer_number: "74847564930",
          last_month_stand_meter: 343,
          this_month_stand_meter: 488,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Pdams", null, {});
  },
};
