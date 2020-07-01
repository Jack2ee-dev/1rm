'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaxWeight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.MaxWeight.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  MaxWeight.init(
    {
      benchpress: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      deadlift: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      squat: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalMax: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'MaxWeight',
    }
  );
  return MaxWeight;
};
