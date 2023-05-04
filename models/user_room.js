'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Room extends Model {
    static associate(models) {
      User_Room.belongsTo(models.User, { foreignKey: 'userId' });
      User_Room.belongsTo(models.Room, { foreignKey: 'roomId' });
    }
  }
  User_Room.init({
    userId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    isRoomOwner: DataTypes.BOOLEAN
  }, {
    timestamps: true,
    sequelize,
    modelName: 'User_Room',
    tableName: 'users_rooms'
  });

  return User_Room;
};