'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn('Electricities', 'cost_per_kwh',
      { type: Sequelize.INTEGER,
        // allowNull: false
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Electricities");
  }
};
