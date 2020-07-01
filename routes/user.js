const router = require('express').Router();

const userController = require('../controllers/user/controller');

router.post('/:userId', userController.getUserData);

module.exports = router;
