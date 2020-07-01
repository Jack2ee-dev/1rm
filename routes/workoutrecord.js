const router = require('express').Router();

const workoutRecordController = require('../controllers/workoutrecord/controller');
const isAuth = require('../middlewares/isAuth');

router.post('/:userId', isAuth, workoutRecordController.postWorkoutRecord);

router.get('/:userId', isAuth, workoutRecordController.getWorkoutRecords);

router.get('/:userId/max', isAuth, workoutRecordController.getMaxWeightRecord);

// router.post('/', workoutRecordController.postWorkoutRecord);

module.exports = router;
