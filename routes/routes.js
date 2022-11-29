const controller = require('../controllers/controllers');
const {isAuth, isDriver, validateUser} = require('../middlewares/middlewares');

const express = require('express');

const router = express.Router();

router.get('/', controller.login);
router.post('/', controller.login_post);

router.get('/logout', controller.logout);

router.get('/register', controller.register);
router.post('/register', controller.register_post);

router.get('/g', isAuth, isDriver, controller.g);

router.post('/g', isAuth, isDriver, validateUser, controller.g_post);
router.get('/g2',isAuth, isDriver, controller.g2);

router.post('/g2/add', isAuth, isDriver, validateUser, controller.g2Add);

router.get('/dashboard', isAuth, controller.dashboard);

module.exports = router;

