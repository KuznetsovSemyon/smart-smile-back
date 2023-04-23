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
      Class.belongsTo(models.User, {
        foreignKey: 'classOwner',
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
    classOwner: {
      type: DataTypes.INTEGER,
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
      classOwner: this.classOwner,
      joinCode: this.joinCode
    };
    return response;
  }
  return Class;
};