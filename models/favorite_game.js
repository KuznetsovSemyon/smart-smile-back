'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite_Game extends Model {
    static associate(models) {

    }
  }
  Favorite_Game.init({
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Favorite_Game',
    tableName: 'favorite_games',
  });
  return Favorite_Game;
};