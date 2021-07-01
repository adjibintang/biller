const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Landlines",
      [
        {
          name: faker.name.findName(),
          telephone_number: faker.phone.phoneNumber(),
          type: "Business",
          abonemen: 50000,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.name.findName(),
          telephone_number: faker.phone.phoneNumber(),
          type: "Residential",
          abonemen: 40000,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.name.findName(),
          telephone_number: faker.phone.phoneNumber(),
          type: "Social",
          abonemen: 30000,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Landlines", null, {});
  },
};
