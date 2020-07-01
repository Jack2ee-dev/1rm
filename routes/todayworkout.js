const router = require('express').Router();

const todayWorkoutController = require('../controllers/todayworkout/controller');
const isAuth = require('../middlewares/isAuth');

router.post('/:userId', isAuth, todayWorkoutController.touchTodayWorkoutDone);

router.get('/:userId', isAuth, todayWorkoutController.getTodayWorkoutRecord);

module.exports = router;
