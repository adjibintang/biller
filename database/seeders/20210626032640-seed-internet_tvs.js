const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Internet_tvs",
      [
        {
          name: faker.name.findName(),
          customer_number: "9403867584",
          provider: "Indihome",
          abonemen: 300000,
          address: faker.address.streetAddress(),
          period: new Date(2021, 06, 20),
          payment_due: new Date(2021, 06, 20),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.name.findName(),
          customer_number: "8465839201",
          provider: "MNC Play",
          abonemen: 320000,
          address: faker.address.streetAddress(),
          period: new Date(2021, 06, 20),
          payment_due: new Date(2021, 06, 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.name.findName(),
          customer_number: "9573628492",
          provider: "Biznet",
          abonemen: 315000,
          address: faker.address.streetAddress(),
          period: new Date(2021, 06, 20),
          payment_due: new Date(2021, 06, 23),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Internet_tvs", null, {});
  },
};
