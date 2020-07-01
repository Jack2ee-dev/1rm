const { WorkoutRecord, Workout, MaxWeight } = require('../../models/index');
const { getWorkoutDone, postWorkoutDone } = require('../todayworkout/functions');

const createWorkoutRecordData = async (
  { type, unit, intensity, reps, userId, workoutId },
  options
) => {
  try {
    const workoutRecord = await WorkoutRecord.create({
      type,
      unit,
      intensity,
      reps,
      userId,
      workoutId,
    });
    return workoutRecord;
  } catch (err) {
    console.log(err);
    err.message = 'WorkoutRecord: failed to CREATE workoutrecorddata';
    throw err;
  }
};

exports.touchWorkoutDone = async (userId) => {
  let isDone;
  try {
    isDone = await getWorkoutDone(userId);
  } catch (err) {
    console.log(err);
    err.message = 'TodayWorkout: failed to GET todayworkout';
    throw err;
  }

  if (!isDone) {
    try {
      isDone = await postWorkoutDone(userId);
    } catch (err) {
      console.log(err);
      err.message = 'TodayWorkout: failed to POST todayworkout';
      throw err;
    }
  }
  return { isDone };
};

exports.postWorkoutRecordData = async ({ type, unit, intensity, reps, userId, workoutId }) => {
  try {
    const workoutRecord = await createWorkoutRecordData({
      type,
      unit,
      intensity,
      reps,
      userId,
      workoutId,
    });
    return workoutRecord;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getWorkoutRecordData = async (userId) => {
  try {
    const workoutRecord = await WorkoutRecord.findAll({
      include: [{ model: Workout }],
      where: { userId: userId },
    });
    return workoutRecord;
  } catch (err) {
    console.log(err);
    err.message = `WorkoutRecord: failed to GET workoutrecord of ${userId} user`;
    throw err;
  }
};

exports.postMaxWeightData = async (userId, workoutId, intensity) => {
  let workout;
  switch (workoutId) {
    case 40:
      workout = 'benchpress';
      break;
    case 31:
      workout = 'deadlift';
      break;
    case 92:
      workout = 'squat';
      break;
    default:
      break;
  }

  try {
    const exMaxRecord = await MaxWeight.findOne({ where: { userId } });
    if (!exMaxRecord) {
      await MaxWeight.create({ [workout]: intensity, totalMax: intensity, userId });
    } else {
      const exIntensity = exMaxRecord[workout];
      const exTotalMax = exMaxRecord.totalMax;
      if (intensity > exIntensity)
        await MaxWeight.update(
          { [workout]: intensity, totalMax: exTotalMax - exIntensity + intensity },
          { where: { userId } }
        );
    }

    return await MaxWeight.findOne({ where: { userId } });
  } catch (err) {
    console.log(err);
    err.message = `MaxWeight: failed to UPDATE ${workout} max weight to ${intensity}`;
    throw err;
  }
};

exports.getMaxWeightData = async (userId) => {
  try {
    const allWeightData = await MaxWeight.findAll();
    const maxWeightData = await MaxWeight.findOne({
      where: { userId },
    });
    const rankData = {
      userCount: allWeightData.length,
      rank: allWeightData.findIndex((e) => e.totalMax == maxWeightData.totalMax) + 1,
    };
    return { maxWeightData, rankData };
  } catch (err) {
    console.log(err);
    err.message = `MaxWeight: failed to GET maxweightdata of ${userId} user`;
  }
};
