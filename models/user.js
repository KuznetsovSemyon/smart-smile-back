'use strict'
const {
  Model
} = require('sequelize')
const crypto = require("crypto");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'roleId' });
      User.hasMany(models.User_Class, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      User.belongsToMany(models.Game, {
        foreignKey: 'userId',
        through: models.Favorite_Game,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    birthday: {
      type:DataTypes.DATE,
      allowNull: false,
    },
    gender:{
      type: DataTypes.ENUM('Mr', 'Mrs'),
      defaultValue: 'Mr',
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    educationInstitution: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
    }, {
      timestamps: true,
      sequelize,
      modelName: 'User',
      tableName: 'users',
    });

  User.prototype.validPassword = function (password) {
    let passwordHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === passwordHash;
  };

  User.prototype.getAllInfo = function () {
    const response = {
      id: this.id,
      name: this.name,
      surname: this.surname,
      email: this.email,
      birthday: this.birthday,
      gender: this.gender,
      country: this.country,
      city: this.city,
      educationInstitution: this.educationInstitution,
    };
    if (this.Role) response.role = this.Role.label;
    return response;
  }
  return User;
};