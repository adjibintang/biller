"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bills",
      [
        {
<<<<<<< HEAD
          user_id: 2,
          // option_id: 1,
          // date_billed: "2021-07-20",
          // due_date: "2021-07-21",
=======
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
>>>>>>> b6c902402841fcbb32fa3cc120009f497da5502a
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
