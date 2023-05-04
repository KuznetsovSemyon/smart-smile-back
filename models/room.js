'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.hasMany(models.User_Room, {
        foreignKey: 'roomId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Room.init({
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    educationInstitution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    joinCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Room',
    tableName: 'rooms'
  });

  Room.prototype.getAllInfo = function () {
    const response = {
      id: this.id,
      label: this.label,
      country: this.country,
      city: this.city,
      educationInstitution: this.educationInstitution,
      joinCode: this.joinCode
    };
    return response;
  }
  return Room;
};