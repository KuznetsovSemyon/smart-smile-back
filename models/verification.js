'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Verification extends Model {
    static associate(models) {
      Verification.belongsTo(models.User, { foreignKey: 'userId' });
      Verification.belongsTo(models.Room, { foreignKey: 'roomId' });
    }
  }
  Verification.init({
    status: {
      type: DataTypes.ENUM('new', 'approved', 'declined'),
      defaultValue: 'new',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Verification',
    tableName: 'verifications',
  });
  return Verification;
};