'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Landlines', 'type',
     { type: Sequelize.ENUM(
      "Business", "Residential", "Social"
      ),
     });
 },

 down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable("Landlines");
 }
};
