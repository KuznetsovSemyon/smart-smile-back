'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.belongsToMany(models.Category, {
        foreignKey: 'gameId',
        through: models.Game_Category,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Game.belongsToMany(models.User, {
        foreignKey: 'gameId',
        through: models.Favorite_Game,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Game.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    } ,
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Game',
    tableName: 'games',
  });
  return Game;
};