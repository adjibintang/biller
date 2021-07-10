const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Services",
      [
        {
          name: "Electricity",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mobile",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Internet & TV",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Landline",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bpjs",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PDAM",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Services", null, {});
  },
};
