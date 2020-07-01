'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhysicalInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.PhysicalInfo.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  PhysicalInfo.init(
    {
      height: DataTypes.DECIMAL(5, 2),
      weight: DataTypes.DECIMAL(5, 2),
      skeletalMuscleMass: DataTypes.DECIMAL(5, 2),
      bodyFatMass: DataTypes.DECIMAL(5, 2),
      bodyMassIndex: DataTypes.DECIMAL(5, 2),
      percentBodyFat: DataTypes.DECIMAL(5, 2),
      waistHipRatio: DataTypes.DECIMAL(5, 2),
    },
    {
      sequelize,
      modelName: 'PhysicalInfo',
    }
  );
  return PhysicalInfo;
};
