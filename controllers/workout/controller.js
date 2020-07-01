const functions = require('./functions');

exports.postWorkouts = async (req, res, next) => {
  try {
    const result = await functions.createBulkWorkoutsData();
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

exports.postWorkout = async (req, res, next) => {
  try {
    const result = await functions.createWorkoutData(req.body);
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

exports.getWorkouts = async (req, res, next) => {
  try {
    const workouts = await functions.getWorkoutsData();
    res.status(200).json({ workouts });
  } catch (err) {
    next(err);
  }
};

exports.getWorkout = async (req, res, next) => {
  try {
    const {
      id,
      targetPartEng,
      targetPartKor,
      targetMuscleEng,
      targetMuscleKor,
      workoutNameEng,
      workoutNameKor,
    } = await functions.getWorkoutData({
      id: req.params.workoutId,
    });
    res.status(200).json({
      id,
      targetPartEng,
      targetPartKor,
      targetMuscleEng,
      targetMuscleKor,
      workoutNameEng,
      workoutNameKor,
    });
  } catch (err) {
    next(err);
  }
};
