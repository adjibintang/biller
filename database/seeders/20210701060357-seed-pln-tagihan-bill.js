"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "pln_tagihan_bills",
      [
        {
          bill_id: 13,
          customer_number: 515430213019,
          name: "Lucia Soemadi",
          rates: "R1",
          power: "900V",
          tagihan_date: new Date("2021-06-20"),
          last_month_stand_meter: 1700,
          this_month_stand_meter: 1804,
          bill_fee: 104000,
          admin_fee: 3000,
          late_payment_fee: 0,
          total: 107000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 20,
          customer_number: 314329011883,
          name: "Jojon Frans",
          rates: "R1",
          power: "1300V",
          tagihan_date: new Date("2021-06-20"),
          last_month_stand_meter: 1700,
          this_month_stand_meter: 1804,
          bill_fee: 104000,
          admin_fee: 3000,
          late_payment_fee: 0,
          total: 107000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 22,
          customer_number: 410311098582,
          name: "Linda Lidia",
          rates: "R1",
          power: "450V",
          tagihan_date: new Date("2021-06-20"),
          last_month_stand_meter: 1450,
          this_month_stand_meter: 1650,
          bill_fee: 104000,
          admin_fee: 3000,
          late_payment_fee: 0,
          total: 107000,
          createdAt: new Date(
            new Date().setTime(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)
          ),
          updatedAt: new Date(
            new Date().setTime(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)
          ),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("pln_tagihan_bills", null, {});
  },
};
