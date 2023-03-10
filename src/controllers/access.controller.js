'use strict';
const AccessService = require('../services/access.service');
const { userValidate } = require('../helpers/validation');
const { BadRequestError } = require('../core/error.response');
class AccessController {
    signUp = async (req, res, next) => {
        console.log(`[P]:::signUp:::`, req.body);
        const { error } = userValidate(req.body);
        console.log(`error:::`, error);
        if (error) {
            throw new BadRequestError(error);
        }

        return res.status(201).json(await AccessService.signUp(req.body));
    };
}

module.exports = new AccessController();
