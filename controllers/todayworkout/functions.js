const moment = require('moment');
require('moment/locale/ko');

const { TodayWorkout } = require('../../models/index');

exports.getTodayLocale = () => {
  const locale = moment().format('YYYY-MM-DD');
  return locale;
};

exports.getWorkoutDone = async (userId) => {
  try {
    const record = await TodayWorkout.findOne({ where: { userId, updatedAt: this.getTodayLocale() } });
    return record;
  } catch (err) {
    console.log(err);
    err.message = `TodayWorkout: failed to GET todayworkoutdone of ${userId} user`;
    throw err;
  }
};

exports.toggleWorkoutDone = async (record) => {
  const { userId } = record;
  try {
    await TodayWorkout.update({ isDone: !record.isDone, updatedAt: this.getTodayLocale() }, { where: { userId: userId }, limit: 1 });
    return { isDone: !record.isDone, updatedAt: this.getTodayLocale() };
  } catch (err) {
    console.log(err);
    err.message = `TodayWorkout: failed to UPDATE todayworkoutdone of ${userId} user`;
    throw err;
  }
};

exports.postWorkoutDone = async (userId) => {
  try {
    const { isDone, updatedAt } = await TodayWorkout.create({
      isDone: true,
      createdAt: this.getTodayLocale(),
      updatedAt: this.getTodayLocale(),
      userId: userId,
    });
    return { isDone, updatedAt };
  } catch (err) {
    err.message = `TodayWorkout: failed to POST todayworkoutdone of ${userId} user`;
  }
};
