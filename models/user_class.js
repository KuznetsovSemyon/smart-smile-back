'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Class extends Model {
    static associate(models) {
      User_Class.belongsTo(models.User, { foreignKey: 'userId' });
      User_Class.belongsTo(models.Class, { foreignKey: 'classId' });
    }
  }
  User_Class.init({
    userId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    isClassOwner: DataTypes.BOOLEAN
  }, {
    timestamps: true,
    sequelize,
    modelName: 'User_Class',
    tableName: 'user_classes'
  });

  return User_Class;
};