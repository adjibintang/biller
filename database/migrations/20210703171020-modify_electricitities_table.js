'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn('Electricities', 'period',
      { type: Sequelize.DATE,
        // allowNull: false
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Electricities");
  }
};
