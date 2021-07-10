const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Bpjss",
      [
        {
          va_number: "49034324",
          name: faker.name.findName(),
          branch: "Surabaya",
          family_member: 4,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          va_number: "438743875",
          name: faker.name.findName(),
          branch: "Malang",
          family_member: 3,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Bpjss", null, {});
  },
};
