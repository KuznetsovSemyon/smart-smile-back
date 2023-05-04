'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('classes', 'rooms');
    await queryInterface.renameTable('user_classes', 'users_rooms');
    await queryInterface.renameColumn('users_rooms', 'classId', 'roomId');
    await queryInterface.renameColumn('users_rooms', 'isClassOwner', 'isRoomOwner');
    await queryInterface.renameColumn('verifications', 'classId', 'roomId');
    await queryInterface.addColumn('users', 'class', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('users', 'educationInstitution', {
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('rooms', 'classes');
    await queryInterface.renameTable('users_rooms', 'user_classes');
    await queryInterface.renameColumn('user_classes', 'roomId', 'classId');
    await queryInterface.renameColumn('user_classes', 'isRoomOwner', 'isClassOwner');
    await queryInterface.renameColumn('verifications', 'roomId', 'classId');
    await queryInterface.removeColumn('users', 'class');
    await queryInterface.changeColumn('users', 'educationInstitution', {
      allowNull: false
    });
  }
};
