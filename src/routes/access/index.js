'use strict';

const express = require('express');
const accessController = require('../../controllers/access.controller');
const router = express.Router();

//singup user and upload avatar???
router.post('/user/signup', accessController.signUp)

//login user
router.post('/user/login',)

module.exports = router;
