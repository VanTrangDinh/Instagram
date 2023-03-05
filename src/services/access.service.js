'use strict';

const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
class AccessService {
    static signUp = async ({ name, email, username, password }) => {
        try {
            //check !email?

            const holderUser = await userModel.findOne({ email }).lean();
            if (holderUser) {
                return {
                    code: 'xxxx',
                    message: 'User already registered!',
                };
            }
            //create a password

            const passwordHash = bcrypt.hash(password, 10);
            const newUser = await userModel.create({
                name,
                email,
                username,
                password: passwordHash,
                avatar: req.file.location,
            });
        } catch (error) {
            return {
                code: 'xxxx',
                message: error.message,
                status: 'error',
            };
        }
    };
}
