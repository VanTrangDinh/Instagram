'use strict';
const keyTokenModel = require('../models/keytoken.model');
class KeyTokenService {
    static createKeyToken = async ({ userId, privateKey, publicKey }) => {
        const tokens = await keyTokenModel.create({
            user: userId,
            publicKey,
            privateKey,
        });

        return tokens;
    };
}

module.exports = KeyTokenService;
