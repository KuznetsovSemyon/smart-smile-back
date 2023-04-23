'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'sex', 'gender');
    await queryInterface.sequelize.query('ALTER TYPE enum_users_sex RENAME TO enum_users_gender');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'gender', 'sex');
    await queryInterface.sequelize.query('ALTER TYPE enum_users_gender RENAME TO enum_users_sex');
  }
};
