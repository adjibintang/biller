'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('bills', 'bill_type',
     { type: Sequelize.ENUM(
      "Listrik-Token",
      "Listrik-Tagihan",
      "Mobile",
      "Landline",
      "Internet-TV",
      "PDAM",
      "BPJS"
      ),
     });
 },

 down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable("bills");
 }
};
