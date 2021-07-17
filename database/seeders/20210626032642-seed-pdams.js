const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Pdams",
      [
        {
          city_id: 1, // Non Active
          name: "Ferris Akhurst",
          customer_number: "65748394854",
          last_month_stand_meter: 300,
          this_month_stand_meter: 320,
          fixed_cost: 7000,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          city_id: 2, // Already Paid
          name: "Dorthea Blofield",
          customer_number: "74847564930",
          last_month_stand_meter: 343,
          this_month_stand_meter: 372,
          fixed_cost: 7000,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          city_id: 2, // Normal
          name: "Elbertina Peaker",
          customer_number: "03948492029",
          last_month_stand_meter: 201,
          this_month_stand_meter: 219,
          fixed_cost: 7000,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          city_id: 2, // Normal
          name: "Alessandra Neeves",
          customer_number: "00292994858",
          last_month_stand_meter: 150,
          this_month_stand_meter: 170,
          fixed_cost: 7000,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          city_id: 2, // Normal
          name: "Sayers Mylan",
          customer_number: "49938405983",
          last_month_stand_meter: 432,
          this_month_stand_meter: 444,
          fixed_cost: 7000,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          city_id: 2, // Late Payment 1 Month
          name: "Livvie Plumm",
          customer_number: "03948492029",
          last_month_stand_meter: 201,
          this_month_stand_meter: 219,
          fixed_cost: 7000,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          city_id: 2, // Late Payment 2 Month
          name: "Hillier Telega",
          customer_number: "00292994859",
          last_month_stand_meter: 150,
          this_month_stand_meter: 170,
          fixed_cost: 7000,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          city_id: 2, // Late Payment 2 Month
          name: "Brianne Vowell",
          customer_number: "49938405984",
          last_month_stand_meter: 432,
          this_month_stand_meter: 444,
          fixed_cost: 7000,
          address: faker.address.streetAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Pdams", null, {});
  },
};
