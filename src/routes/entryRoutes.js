const express = require('express');
const { create, update, remove, get } = require('../controllers/entryController');
const auth = require('../middleware/auth');
const entryRoute = express.Router();

entryRoute.post('/create', auth, create);
entryRoute.get('/get', auth, get);
entryRoute.put('/update/:id', auth, update);
entryRoute.delete('/delete/:id', auth, remove);

module.exports = entryRoute;