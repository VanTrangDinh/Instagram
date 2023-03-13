'use strict'

const express = require('express')
const userController = require('../../controllers/user.controller');
const catchAsync = require('../../utils/catchAsync');
const router = express.Router();

router.post('/signup', catchAsync(userController.createUser));

module.exports = router;