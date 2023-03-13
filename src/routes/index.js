'use strict';

const express = require('express');
const router = express.Router();

//check apiKey

//check permission apiKey

router.use('/v1/api', require('./access'));
router.use('/v1/api', require('./v1/index'))

module.exports = router;
