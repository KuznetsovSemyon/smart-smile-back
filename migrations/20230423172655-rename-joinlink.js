'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('classes', 'joinLink', 'joinCode');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('classes', 'joinCode', 'joinLink');
  }
};
