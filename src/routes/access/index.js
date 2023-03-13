'use strict';

const express = require('express');
//const accessController = require('../../controllers/access.controller');
//const userController = require('../../controllers/user.controller');
//const catchAsync = require('../../utils/catchAsync');

const router = express.Router();

//singup user and upload avatar???
//viết handler error ngay tại route
//router.post('/user/signup', catchAsync(accessController.signUp))
// router.post('/user/signup', catchAsync(userController.createUser));

router.use('/user', require('./user.route'))


module.exports = router;
