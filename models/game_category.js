'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game_Category extends Model {
    static associate(models) {}
  }
  Game_Category.init({
    categoryId: {
      type: DataTypes.INTEGER
    },
    gameId: {
      type: DataTypes.INTEGER
    },
    order: {
      type: DataTypes.INTEGER
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Game_Category',
    tableName: 'game_categories',
  });
  return Game_Category;
};