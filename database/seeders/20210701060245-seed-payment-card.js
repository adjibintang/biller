const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "payment_cards",
      [
        {
          user_id: 1,
          card_number: "4128178404849",
          card_holder_name: faker.name.findName(),
          expire_date: "2021-10-12",
          cvv: "123",
          type: "Credit Card",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          card_number: "4347016694755",
          card_holder_name: faker.name.findName(),
          expire_date: "2021-10-12",
          cvv: "123",
          type: "Debit Card",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("payment_cards", null, {});
  },
};
