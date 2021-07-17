"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bills",
      [
        {
          user_id: 1,
          bill_type: "Listrik-Token",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          bill_type: "Listrik-Tagihan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          bill_type: "PDAM",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          bill_type: "BPJS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3, // Already Paid Case
          bill_type: "BPJS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3, // VA Number Non Active
          bill_type: "BPJS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3, // PDAM Service Not Active
          bill_type: "PDAM",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3, // PDAM Service Already Paid
          bill_type: "PDAM",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3, // PDAM Service Late 1 Month
          bill_type: "PDAM",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3, // PDAM Service Late 2 Month
          bill_type: "PDAM",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3, // PDAM Service Late 2 Month
          bill_type: "PDAM",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bills", null, {});
  },
};
