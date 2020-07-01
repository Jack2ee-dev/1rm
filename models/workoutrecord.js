'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkoutRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.WorkoutRecord.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      models.WorkoutRecord.belongsTo(models.Workout, {
        foreignKey: 'workoutId',
      });
    }
  }
  WorkoutRecord.init(
    {
      type: DataTypes.STRING,
      unit: DataTypes.STRING,
      intensity: DataTypes.INTEGER,
      reps: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'WorkoutRecord',
    }
  );
  return WorkoutRecord;
};
