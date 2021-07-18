"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "pdam_bills",
      [
        {
          bill_id: 7, // PDAM Service Not Active
          customer_number: "65748394854",
          name: "Ferris Akhurst",
          period: "2021-03-20",
          total_month: 1,
          last_month_stand_meter: 295,
          this_month_stand_meter: 300,
          usage: 5,
          bill_fee: 35000,
          admin_fee: 2500,
          ppn: 0,
          stamp_cost: 0,
          late_payment_fee: 0,
          total: 37500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 8, // PDAM Service Already Paid
          customer_number: "74847564930",
          name: "Dorthea Blofield",
          period: "2021-06-20",
          total_month: 1,
          last_month_stand_meter: 333,
          this_month_stand_meter: 343,
          usage: 10,
          bill_fee: 70000,
          admin_fee: 2500,
          ppn: 0,
          stamp_cost: 0,
          late_payment_fee: 0,
          total: 72500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 9, // Late Pay 1 Month
          customer_number: "03948492029",
          name: "Livvie Plumm",
          period: "2021-05-20",
          total_month: 1,
          last_month_stand_meter: 192,
          this_month_stand_meter: 201,
          usage: 9,
          bill_fee: 63000,
          admin_fee: 2500,
          ppn: 0,
          stamp_cost: 0,
          late_payment_fee: 0,
          total: 65500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 10, // Late Pay 2 Month
          customer_number: "00292994859",
          name: "Hillier Telega",
          period: "2021-04-20",
          total_month: 1,
          last_month_stand_meter: 140,
          this_month_stand_meter: 150,
          usage: 10,
          bill_fee: 70000,
          admin_fee: 2500,
          ppn: 0,
          stamp_cost: 0,
          late_payment_fee: 0,
          total: 72500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 11, // Late Pay 2 Month
          customer_number: "49938405984",
          name: "Brianne Vowell",
          period: "2021-04-20",
          total_month: 1,
          last_month_stand_meter: 425,
          this_month_stand_meter: 432,
          usage: 7,
          bill_fee: 49000,
          admin_fee: 2500,
          ppn: 0,
          stamp_cost: 0,
          late_payment_fee: 0,
          total: 51500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 18, // Late Pay 2 Month
          customer_number: "03948492029",
          name: "Elbertina Peaker",
          period: "2021-06-20",
          total_month: 1,
          last_month_stand_meter: 425,
          this_month_stand_meter: 432,
          usage: 7,
          bill_fee: 49000,
          admin_fee: 2500,
          ppn: 0,
          stamp_cost: 0,
          late_payment_fee: 0,
          total: 51500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("pdam_bills", null, {});
  },
};
