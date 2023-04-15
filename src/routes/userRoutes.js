const express = require('express');
const userRoute = express.Router();
const { signup, signing, reset } = require('../controllers/userController');

userRoute.post('/signup', signup);
userRoute.post('/reset', reset);
userRoute.post('/signing', signing);

module.exports = userRoute;