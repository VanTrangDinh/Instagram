'use strict';
const userModel = require('../models/user.model');
const httpStatus = require('http-status');
const ApiError = require('../utils/api.error');

const createUser = async (userBody) => {
    if (await userModel.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already registered');
    }

    if (await userModel.isUsernameTaken(userBody.username)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Username already registered');
    }

    return userModel.create(userBody);
};


//...

const getUserByEmail = async (email) => {
    return userModel.findOne({email})
}
module.exports =  {
    createUser,
    getUserByEmail
 }
