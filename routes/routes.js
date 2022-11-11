const {g, gEdit, gUpdate, g2, g2Add, login, dashboard} = require('../controllers/controllers.js');

const express = require('express');

const router = express.Router();

router.get('/', dashboard);

router.get('/g', g);

router.get('/g/edit', gEdit);

router.post('/g/update/:id', gUpdate);

router.get('/g2', g2);

router.post('/g2/add', g2Add);

router.get('/login', login);

module.exports = router;

