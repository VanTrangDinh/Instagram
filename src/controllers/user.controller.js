'use strict';
const UserService = require('../services/user.service');
const { userValidate } = require('../helpers/validation');
const { BadRequestError } = require('../core/error.response');
class UserController {
    createUser = async (req, res, next) => {
        console.log(`[P]:::signUp:::`, req.body);
        const { error } = userValidate(req.body);
        console.log(`error:::`, error);
        if (error) {
            throw new BadRequestError(error);
        }

        return res.status(201).json(await UserService.createUser(req.body));
    };
}

module.exports = new UserController();
