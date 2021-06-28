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
