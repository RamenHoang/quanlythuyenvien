'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add fields to thuyenvien table
    await queryInterface.addColumn('thuyenvien', 'thoigian_lenTauDuKien', {
      type: Sequelize.DATE,
      allowNull: true
    });

    // Add fields to lichsuditau table
    await queryInterface.addColumn('lichsuditau', 'quoctich_thuyen', {
      type: Sequelize.STRING(50),
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove fields from thuyenvien table
    await queryInterface.removeColumn('thuyenvien', 'thoigian_lenTauDuKien');

    // Remove fields from lichsuditau table
    await queryInterface.removeColumn('lichsuditau', 'quoctich_thuyen');
  }
};
