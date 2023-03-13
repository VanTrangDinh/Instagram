'use strict';
const { userService } = require('../services');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
});

module.exports = {
    createUser,
};
