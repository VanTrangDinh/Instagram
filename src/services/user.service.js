'use strict';
const userModel = require('../models/user.model');
const { BadRequestError } = require('../core/error.response');

class UserService {
    static createUser = async ({ name, email, username, password }) => {
        if (await userModel.isEmailTaken(email)) {
            throw new BadRequestError('Email already registered');
        }

        if (await userModel.isUsernameTaken(username)) {
            throw new BadRequestError('Username already registered');
        }

        return userModel.create({ name, email, username, password });
    };
}

module.exports = UserService;
