const express = require('express');
const { create, update, remove, getAll } = require('../controllers/customerController');
const auth = require('../middleware/auth');
const customerRouter = express.Router();

customerRouter.post('/create', auth, create);
customerRouter.get('/get', auth, getAll);
customerRouter.put('/update/:id', auth, update);
customerRouter.delete('/delete/:id', auth, remove);

module.exports = { customerRouter };