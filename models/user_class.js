'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Class extends Model {
    static associate(models) {

    }
  }
  User_Class.init({
    userId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER
  }, {
    timestamps: true,
    sequelize,
    modelName: 'User_Class',
    tableName: 'user_classes'
  });

  return User_Class;
};