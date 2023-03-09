'use strict';

const express = require('express');
//const accessController = require('../../controllers/access.controller');
const userController = require('../../controllers/user.controller')
const asyncHandler = require('../../utils/catchAsync');
const router = express.Router();

//singup user and upload avatar???
//viết handler error ngay tại route
// router.post('/user/signup', asyncHandler(accessController.signUp))
router.post('/user/signup', asyncHandler(userController.signUp))

//login user
router.post('/user/login',)

module.exports = router;
