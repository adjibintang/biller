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
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.name.findName(),
          telephone_number: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.name.findName(),
          telephone_number: faker.phone.phoneNumber(),
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
