'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('classes', 'educationInstitution', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('classes', 'city', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('classes', 'country', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('classes', 'classOwner', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addColumn('classes', 'joinLink', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('classes', 'educationInstitution');
    await queryInterface.removeColumn('classes', 'city');
    await queryInterface.removeColumn('classes', 'country');
    await queryInterface.removeColumn('classes', 'classOwner');
    await queryInterface.removeColumn('classes', 'joinLink');
  }
};
