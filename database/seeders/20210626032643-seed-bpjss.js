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
          type: "Kelas I",
          cost: 150000,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          va_number: "438743875",
          name: faker.name.findName(),
          branch: "Malang",
          family_member: 3,
          type: "Kelas II",
          cost: 100000,
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
