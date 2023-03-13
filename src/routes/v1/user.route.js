const express = require('express');
const userValidate = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const validate = require('../../middlewares/validate');
const router = express.Router();

router.route('/').post(validate(userValidate.createUser), userController.createUser);

module.exports = router;
