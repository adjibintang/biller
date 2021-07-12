const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Options",
      [
        {
          service_id: 1,
          name: "PLN - Token",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 1,
          name: "PLN - Tagihan",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 2,
          name: "Pulsa(pre-paid)",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 2,
          name: "Internet(pre-paid)",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 2,
          name: "Pasca baya(post-paid)",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 3,
          name: "Indihome",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 3,
          name: "MNC Play",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          service_id: 3,
          name: "Biznet Home",
          image_url: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Options", null, {});
  },
};
