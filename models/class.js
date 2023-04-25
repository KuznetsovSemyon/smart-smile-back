'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      Class.hasMany(models.User_Class, {
        foreignKey: 'classId',
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
    modelName: 'Class',
    tableName: 'classes'
  });

  Class.prototype.getAllInfo = function () {
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
  return Class;
};