const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Landlines",
      [
        {
          name: "Jiya Rahmana",
          telephone_number: "02314032045",
          type: "Business",
          abonemen: 90000,
          address: "Jl. Merdeka No 10, Jakarta",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: "2021-06-25",
        },
        {
          name: "Andi Kadir",
          telephone_number: "0226012345",
          type: "Residential",
          abonemen: 75000,
          address: "Jl. Tirta Kavling No. 1, Cimahi",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: "2021-06-25",
        },
        {
          name: "Fani Riyanti",
          telephone_number: "0214307701",
          type: "Social",
          abonemen: 50000,
          address: "Jl. Kanyakan Luar No.9 , Depok",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: "2021-06-25",
        },
        {
          name: "M. Arsyad",
          telephone_number: "02354013078",
          type: "Business",
          abonemen: 100000,
          address: "Jl. Cut Nyak Dien No 97, Surabaya",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: "2021-05-25",
        },
        {
          name: "Jaka Subandi",
          telephone_number: "01304031277",
          type: "Residential",
          abonemen: 75000,
          address: "Jl. Jend. Sudirman No. 98, Pariaman",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: "2021-04-25",
        },
        {
          name: "Amanda Nisya",
          telephone_number: "0222304502",
          type: "Social",
          abonemen: 50000,
          address: "Jl. Sarijadi No.105, Bandung",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: "2021-03-25",
        },
        {
          name: "Eko Prasetiyo",
          telephone_number: "0246785120",
          type: "Residential",
          abonemen: 60000,
          address: "Jl. Malioboro No.107, Yogyakarta",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: "2021-07-10",
        },
        {
          name: "Maya Risfandi",
          telephone_number: "0529008473",
          type: "Social",
          abonemen: 50000,
          address: "Jl. Danau Limboto No. 44, Gorontalo",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: "2021-07-10",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Landlines", null, {});
  },
};
