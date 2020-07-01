const { sequelize, Workout } = require('../../models/index');
const workoutData = require('../../data/workoutdata');

exports.createBulkWorkoutsData = async () => {
  try {
    await sequelize.transaction(async (t) => {
      await Workout.bulkCreate(workoutData, { transaction: t });
    });
    return true;
  } catch (err) {
    console.log(err);
    err.message = 'Workout: failed to create bulk workoutdata';
    throw err;
  }
};

exports.createWorkoutData = async (workoutData) => {
  try {
    await Workout.create(workoutData);
    return true;
  } catch (err) {
    console.log(err);
    err.message = 'Workout: failed to create a workout';
    throw err;
  }
};

exports.getWorkoutsData = async () => {
  try {
    const workouts = await Workout.findAll({});
    return workouts;
  } catch (err) {
    console.log(err);
    err.message = `Workout: failed to get workouts`;
    throw err;
  }
};

exports.getWorkoutData = async (identifiers) => {
  try {
    const workout = await Workout.findOne({ where: identifiers });
    return workout;
  } catch (err) {
    console.log(err);
    err.message = `Workout: failed to get ${identifiers}`;
    throw err;
  }
};
