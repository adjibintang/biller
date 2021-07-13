"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Mobiles",
      [
        {
          mobile_card_id: 1,
          phone_number: "081164758693",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 1,
          phone_number: "081165899375",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 2,
          phone_number: "081244896049",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 2,
          phone_number: "081200289477",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 3,
          phone_number: "081387567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 4,
          phone_number: "082198891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 5,
          phone_number: "082212988917",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 6,
          phone_number: "082398891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 7,
          phone_number: "085189173644",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 8,
          phone_number: "085298891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 9,
          phone_number: "085398891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 10,
          phone_number: "081798891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 11,
          phone_number: "081898891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 12,
          phone_number: "081998891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 13,
          phone_number: "085998891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 14,
          phone_number: "087798891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 15,
          phone_number: "087898891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 16,
          phone_number: "081498891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 17,
          phone_number: "081598891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 18,
          phone_number: "081698891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 19,
          phone_number: "085598891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 20,
          phone_number: "085698891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 21,
          phone_number: "085798891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 22,
          phone_number: "085898891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 23,
          phone_number: "083198891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 24,
          phone_number: "083298891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 25,
          phone_number: "083398891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 26,
          phone_number: "083898891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 27,
          phone_number: "089598891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 28,
          phone_number: "089698891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 29,
          phone_number: "089798891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 30,
          phone_number: "089898891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 31,
          phone_number: "089998891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 32,
          phone_number: "088198891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 33,
          phone_number: "088298891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 34,
          phone_number: "088398891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 35,
          phone_number: "088498891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 36,
          phone_number: "088598891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 37,
          phone_number: "088698891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 38,
          phone_number: "088798891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 39,
          phone_number: "088898891736",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mobile_card_id: 40,
          phone_number: "088998891736",
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
