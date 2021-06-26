"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Mobile_cards",
      [
        {
          mobile_provider_id: 1,
          prefix: "0811",
          name: "Kartu Hallo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_provider_id: 1,
          prefix: "0821",
          name: "simPATI",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_provider_id: 1,
          prefix: "0823",
          name: "Kartu As",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Mobile_cards", null, {});
  },
};
