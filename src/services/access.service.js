'use strict';

const userModel = require('../models/user.model');
const KeyTokenService = require('../services/keytoken.service');
const { getInfoData } = require('../utils/pick');
const { createTokenPair } = require('../auth/authUtils');

const createError = require('http-errors');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { BadRequestError } = require('../core/error.response');
//const sendCookie = require('../utils/send.cookie');
class AccessService {
    static signUp = async ({ name, email, username, password }) => {
        console.log(`check:::`, { name, email, username, password });

        const user = await userModel.findOne({ $or: [{ email }, { username }] }).lean();
        if (user) {
            if (user.username === username) {
                throw new BadRequestError('Username already registered');
            }
            throw new BadRequestError('Email already registered');
        }

        //create newUser
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            name,
            email,
            username,
            password: passwordHash,
            //avatar: req.file.location
        });

        if (newUser) {
            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');
            console.log({ privateKey, publicKey });
            //save publicKey into keyStore
            const keyStore = await KeyTokenService.createKeyToken({
                userId: newUser._id,
                publicKey,
                privateKey,
            });

            if (!keyStore) {
                throw new BadRequestError('KeyStore error');
            }
            //create token pair
            const tokens = await createTokenPair({ userId: newUser._id, email }, publicKey, privateKey);
            console.log(`Created Token Success:::`, tokens.accessToken);


           
            return {
                code: 201,
                metadata: {
                    user: getInfoData({ fileds: ['_id', 'name', 'email'], object: newUser }), // function custome o utils khi dung lodash
                    tokens,
                },
            };

            //const tokens = await >>> tao trong auth
        }
        // return {
        //     code: 200,
        //     metadata: null,
        // };
        //sendCookie(newUser, 201, res);
    };

    //logIn
}

module.exports = AccessService;
