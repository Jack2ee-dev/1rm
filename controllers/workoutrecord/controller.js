const functions = require('./functions');

exports.postWorkoutRecord = async (req, res, next) => {
  const { workoutId, type, unit, intensity, reps } = req.body;
  const { userId } = req.params;
  try {
    const workoutRecord = await functions.postWorkoutRecordData({
      type,
      unit,
      intensity,
      reps,
      userId,
      workoutId,
    });
    const { isDone } = await functions.touchWorkoutDone(userId);
    const maxWeight = await functions.postMaxWeightData(userId, workoutId, intensity);
    res.status(201).json({ workoutRecord, isDone, maxWeight });
  } catch (err) {
    next(err);
  }
};

exports.getWorkoutRecords = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const workoutRecords = await functions.getWorkoutRecordData(userId);
    res.status(200).json(workoutRecords);
  } catch (err) {
    next(err);
  }
};

exports.getMaxWeightRecord = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const { maxWeightData, rankData } = await functions.getMaxWeightData(userId);
    res.status(200).json({ maxWeightData, rankData });
  } catch (err) {
    next(err);
  }
};
