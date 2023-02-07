const controller = require('../controllers/controllers');

const express = require('express');

const router = express.Router();

router.get('/', controller.dashboard);
module.exports = router;

