const express = require('express');
const userRoute = express.Router();
const { signup, signing, reset, user } = require('../controllers/userController');
const auth = require('../middleware/auth');

userRoute.post('/signup', signup);
userRoute.post('/reset', reset);
userRoute.post('/signing', signing);
userRoute.get('/user', auth, user);

module.exports = userRoute;