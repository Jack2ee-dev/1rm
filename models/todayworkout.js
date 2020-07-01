'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodayWorkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.TodayWorkout.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  TodayWorkout.init(
    {
      isDone: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATEONLY,
      updatedAt: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'TodayWorkout',
    }
  );
  return TodayWorkout;
};
