const functions = require('./functions');

exports.getTodayWorkoutRecord = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const { isDone, updatedAt } = await functions.getWorkoutDone(userId);
    res.status(200).json({ isDone, today: updatedAt });
  } catch (err) {
    err.message = `TodayWorkout: failed to GET todayworkoutdone ${userId} user`;
  }
};

exports.touchTodayWorkoutDone = async (req, res, next) => {
  const { userId } = req.params || 0;

  try {
    const isDoneData = await functions.getWorkoutDone(userId);
    if (isDone) {
      const { isDone, updatedAt } = await functions.toggleWorkoutDone(isDoneData);
      res.status(200).json({
        isDone: isDone,
        today: updatedAt,
      });
      return;
    } else {
      const { isDone, updatedAt } = await functions.postWorkoutDone(userId);
      res.status(201).json({
        isDone: isDone,
        today: updatedAt,
      });
    }
  } catch (err) {
    next(err);
  }
};
