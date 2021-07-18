"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "recurring_billings",
      [
        {
          bill_id: 1,
          period: "Month",
          date_billed: "2021-07-20",
          due_date: "2021-07-21",
          is_delete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 2,
          period: "Week",
          date_billed: "2021-07-20",
          due_date: "2021-07-21",
          is_delete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 12,
          period: "Week",
          date_billed: "2021-07-20",
          due_date: "2021-07-21",
          is_delete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 13,
          period: "Month",
          date_billed: "2021-08-20",
          due_date: "2021-08-25",
          is_delete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 14,
          period: "Week",
          date_billed: "2021-07-20",
          due_date: "2021-07-21",
          is_delete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 15,
          period: "Week",
          date_billed: "2021-07-20",
          due_date: "2021-07-21",
          is_delete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 16,
          period: "Month",
          date_billed: "2021-08-20",
          due_date: "2021-08-21",
          is_delete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 17,
          period: "Week",
          date_billed: "2021-08-20",
          due_date: "2021-08-21",
          is_delete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 18,
          period: "Week",
          date_billed: "2021-08-20",
          due_date: "2021-08-25",
          is_delete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 19,
          period: "Week",
          date_billed: "2021-08-08",
          due_date: "2021-08-08",
          is_delete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("recurring_billings", null, {});
  },
};
