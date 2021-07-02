"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bills",
      [
        {
          user_id: 2,
          // option_id: 1,
          // date_billed: "2021-07-20",
          // due_date: "2021-07-21",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   user_id: 1,
        //   // option_id: 2,
        //   // date_billed: "2021-07-20",
        //   // due_date: "2021-07-21",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   user_id: 2,
        //   // option_id: 1,
        //   // date_billed: "2021-07-20",
        //   // due_date: "2021-07-21",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   user_id: 2,
        //   // option_id: 3,
        //   // date_billed: "2021-07-20",
        //   // due_date: "2021-07-21",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bills", null, {});
  },
};
