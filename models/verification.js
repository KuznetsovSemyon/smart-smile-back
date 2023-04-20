'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Verification extends Model {
    static associate(models) {
      Verification.belongsTo(models.User, { foreignKey: 'userId' });
      Verification.belongsTo(models.Class, { foreignKey: 'userId' });
    }
  }
  Verification.init({
    status: {
      type: DataTypes.ENUM('new', 'approved', 'declined'),
      defaultValue: 'new',
    },
    userId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Verification',
    tableName: 'verifications',
  });
  return Verification;
};