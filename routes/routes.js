const controller = require('../controllers/controllers');
const {isAuth, isDriver, isExaminer, validateUser, isAdmin} = require('../middlewares/middlewares');

const express = require('express');

const router = express.Router();

router.get('/', controller.login);
router.post('/', controller.login_post);

router.get('/logout', controller.logout);

router.get('/register', controller.register);
router.post('/register', controller.register_post);

router.get('/g', isAuth, isDriver, controller.g);

router.post('/g', isAuth, isDriver, validateUser, controller.g_post);
router.post('/g/appointment', isAuth, isDriver, validateUser, controller.g_appointment_post);

router.get('/g2',isAuth, isDriver, controller.g2);

router.post('/g2', isAuth, isDriver, validateUser, controller.g2_post);
router.post('/g2/appointment', isAuth, isDriver, validateUser, controller.g2_appointment_post);


router.get('/dashboard', isAuth, controller.dashboard);

router.get('/appointments', isAuth, isAdmin, controller.appointments);
router.post('/appointments', isAuth, isAdmin, controller.appointments_post);

router.get('/examiner', isAuth, isExaminer, controller.examiner);
router.get('/examiner/user/:id', isAuth, isExaminer, controller.examiner_user);
router.post('/examiner/user/:id', isAuth, isExaminer, controller.examiner_user_post);

module.exports = router;

