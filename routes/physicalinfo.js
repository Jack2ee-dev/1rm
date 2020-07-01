const router = require('express').Router();

const physicalInfoController = require('../controllers/physicalinfo/controller');
const isAuth = require('../middlewares/isAuth');

router.post('/:userId', isAuth, physicalInfoController.postPhysicalInfo);

router.get('/:userId', isAuth, physicalInfoController.getPhysicalInfo);

module.exports = router;
