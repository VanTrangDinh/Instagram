'use strict'
const keyTokenModel = require('../models/keytoken.model')
class KeyTokenService {
    static createKeyToken = async ({userId, privateKey, publicKey}) => {
        try {
            const tokens = await keyTokenModel.create({
                user: userId,
                publicKey,
                privateKey
            })

            return tokens
    
        } catch (error) {
            return 
        }
    }
}

module.exports = KeyTokenService