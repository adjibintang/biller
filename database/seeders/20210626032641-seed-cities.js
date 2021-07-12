const fs = require("fs");
const { regencies } = require("../locations");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let regenciesData = [];
    for (let i = 0; i < regencies.length; i++) {
      const data = {
        name: regencies[i].name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      regenciesData.push(data);
    }

    await queryInterface.bulkInsert("Cities", regenciesData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Cities", null, {});
  },
};
