const {g, g2, login, dashboard} = require('../controllers/controllers.js');

const express = require('express');

const router = express.Router();

router.get('/', dashboard);

router.get('/g', g);

router.get('/g2', g2);

router.get('/login', login);

module.exports = router;

