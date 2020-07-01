'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Workout.init({
    targetPartEng: DataTypes.STRING,
    targetPartKor: DataTypes.STRING,
    targetMuscleEng: DataTypes.STRING,
    targetMuscleKor: DataTypes.STRING,
    workoutNameEng: DataTypes.STRING,
    workoutNameKor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Workout',
  });
  return Workout;
};