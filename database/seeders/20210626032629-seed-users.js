const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          first_name: faker.name.lastName(),
          last_name: faker.name.firstName(),
          email: faker.internet.email(),
          password:
            "$2a$10$VxxcwIjckcgCME8xMQgK2OBd7oZAQMbViGlDO/UIWVv7P77FOjyF6", // Password123
          pin: "$2b$10$UNdqLSiTZ0j0qayDsZ4cjulNqGqdjmUCHMfPQ3lrYW6gfmoorXu06", // 123456
          phone_number: faker.phone.phoneNumber(),
          image_url: faker.image.imageUrl(),
          is_verified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          first_name: faker.name.lastName(),
          last_name: faker.name.firstName(),
          email: faker.internet.email(),
          password:
            "$2a$10$VxxcwIjckcgCME8xMQgK2OBd7oZAQMbViGlDO/UIWVv7P77FOjyF6", // Password123
          pin: "$2b$10$UNdqLSiTZ0j0qayDsZ4cjulNqGqdjmUCHMfPQ3lrYW6gfmoorXu06", // 123456
          phone_number: faker.phone.phoneNumber(),
          image_url: faker.image.imageUrl(),
          is_verified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          first_name: "User",
          last_name: "Testing",
          email: "usertesting@gmail.com",
          password:
            "$2a$10$VxxcwIjckcgCME8xMQgK2OBd7oZAQMbViGlDO/UIWVv7P77FOjyF6", // Password123
          pin: "$2b$10$UNdqLSiTZ0j0qayDsZ4cjulNqGqdjmUCHMfPQ3lrYW6gfmoorXu06", // 123456
          phone_number: faker.phone.phoneNumber(),
          image_url: faker.image.imageUrl(),
          is_verified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
