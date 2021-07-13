// const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Electricities",
      [
        {
          name: "Lucia Soemadi",
          meter_number: 1111731145,
          customer_number: 515430213019,
          rates: "R1",
          power: "900V",
          cost_per_kwh: 1000,
          last_month_stand_meter: 1804,
          this_month_stand_meter: 2504,
          address: "Jl. Bojongsoang No. 225, Bandung",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: 2021-06-10
        },
        {
          name: "Jojon Frans",
          meter_number: 1498223465,
          customer_number: 314329011883,
          rates: "R1",
          power: "1300V",
          cost_per_kwh: 1200,
          last_month_stand_meter: 1990,
          this_month_stand_meter: 2100,
          address: "Jl. Sudirman No.34, Sumedang",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: 2021-06-20
        },
        {
          name: "Linda Lidia",
          meter_number: 2448129405,
          customer_number: 410311098582,
          rates: "R1",
          power: "450V",
          cost_per_kwh: 1000,
          last_month_stand_meter: 1450,
          this_month_stand_meter: 1650,
          address: "Jl. Daan Mogot No. 210, Jakarta",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: 2021-06-20
        },
        {
          name: "Safira Arumawati",
          meter_number: 3118532015,
          customer_number: 221205041780,
          rates: "R1",
          power: "900V",
          cost_per_kwh: 1000,
          last_month_stand_meter: 1810,
          this_month_stand_meter: 2100,
          address: "Jl. Paledang No. 56, Bandung",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: 2021-05-20
        },
        {
          name: "Sari Sriandini",
          meter_number: 1246173401,
          customer_number: 212417087460,
          rates: "R1",
          power: "1300V",
          cost_per_kwh: 1200,
          last_month_stand_meter: 1750,
          this_month_stand_meter: 2010,
          address: "Jl. Palria No. 24, Padang",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: 2021-04-20
        },
        {
          name: "Hadi Soebandono",
          meter_number: 3120054475,
          customer_number: 105217077531,
          rates: "R1",
          power: "900V",
          cost_per_kwh: 1000,
          last_month_stand_meter: 1610,
          this_month_stand_meter: 1810,
          address: "Jl. Polip Kusuma No. 10, Semarang",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: 2021-03-20
        },
        {
          name: "Raya Kosandi",
          meter_number: 5146173417,
          customer_number: 411017045471,
          rates: "R1",
          power: "1300V",
          cost_per_kwh: 1200,
          last_month_stand_meter: 1850,
          this_month_stand_meter: 2050,
          address: "Jl. Kanyakan Luar No.9 , Depok",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: 2021-07-10
        },
        {
          name: "Boris Siregar",
          meter_number: 2051363015,
          customer_number: 111537442589,
          rates: "R1",
          power: "900V",
          cost_per_kwh: 1000,
          last_month_stand_meter: 1550,
          this_month_stand_meter: 1850,
          address: "Jl. Jend. Sudirman No. 98, Pariaman",
          createdAt: new Date(),
          updatedAt: new Date(),
          period: 2021-07-10
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Electricities", null, {});
  },
};
