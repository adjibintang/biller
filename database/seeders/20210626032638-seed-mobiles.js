"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Mobiles",
      [
        {
          mobile_card_id: 2,
          phone_number: "082187567890",
          post_payment_fee: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 1,
          phone_number: "081164758693",
          post_payment_fee: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 3,
          phone_number: "082398891736",
          post_payment_fee: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Mobiles", null, {});
  },
};
