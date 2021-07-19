"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "mobile_bills",
      [
        {
          bill_id: 14,
          phone_number: "081164758693",
          provider: "Telkomsel",
          package_name: null,
          description: null,
          bill_fee: 50000,
          admin_fee: 1500,
          total: 51500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 15,
          phone_number: "081164758693",
          provider: "Telkomsel",
          package_name: "Internet OMG! 52GB",
          description:
            "Paket Internet OMG! berlaku untuk 30 hari, dengan kuota : Kuota Internet dengan akses di semua jaringan (2G/3G/4G). Kuota 2 GB OMG! untuk akses Youtube, Facebook, Instagram, MAXstream, HOOQ, Viu, iFlix, Klik Film, Bein Sport, dan Nickelodeon Play berlaku 30 hari. Termasuk berlangganan HOOQ 30 hari.",
          bill_fee: 200000,
          admin_fee: 1500,
          total: 201500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bill_id: 23,
          phone_number: "081164758693",
          provider: "Telkomsel",
          package_name: null,
          description: null,
          bill_fee: 50000,
          admin_fee: 1500,
          total: 51500,
          createdAt: new Date(
            new Date().setTime(new Date().getTime() - 20 * 24 * 60 * 60 * 1000)
          ),
          updatedAt: new Date(
            new Date().setTime(new Date().getTime() - 20 * 24 * 60 * 60 * 1000)
          ),
        },
        {
          bill_id: 24,
          phone_number: "081164758693",
          provider: "Telkomsel",
          package_name: "Internet OMG! 52GB",
          description:
            "Paket Internet OMG! berlaku untuk 30 hari, dengan kuota : Kuota Internet dengan akses di semua jaringan (2G/3G/4G). Kuota 2 GB OMG! untuk akses Youtube, Facebook, Instagram, MAXstream, HOOQ, Viu, iFlix, Klik Film, Bein Sport, dan Nickelodeon Play berlaku 30 hari. Termasuk berlangganan HOOQ 30 hari.",
          bill_fee: 200000,
          admin_fee: 1500,
          total: 201500,
          createdAt: new Date(
            new Date().setTime(new Date().getTime() - 60 * 24 * 60 * 60 * 1000)
          ),
          updatedAt: new Date(
            new Date().setTime(new Date().getTime() - 60 * 24 * 60 * 60 * 1000)
          ),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("mobile_bills", null, {});
  },
};
