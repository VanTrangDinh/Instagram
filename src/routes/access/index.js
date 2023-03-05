'use strict';

const express = require('express');
const accessController = require('../../controllers/access.controller');
const router = express.Router();

//singup user

router.post('/user/signup', accessController.signup)

module.exports = router;
