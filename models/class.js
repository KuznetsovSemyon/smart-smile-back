'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      Class.belongsToMany(models.User, {
        foreignKey: 'classId',
        through: models.User_Class,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Class.init({
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Class',
    tableName: 'classes'
  });
  return Class;
};