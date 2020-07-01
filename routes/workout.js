const router = require('express').Router();

const workoutController = require('../controllers/workout/controller');

router.post('/', workoutController.postWorkouts);

router.get('/', workoutController.getWorkouts);

router.get('/:workoutId', workoutController.getWorkout);

module.exports = router;
