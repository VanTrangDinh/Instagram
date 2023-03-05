// 'use strict';

// const userModel = require('../models/user.model');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const KeyTokenService = require('./keytoken.service');
// const { createTokenPair } = require('../auth/authUtils');
// const {getInfoData} = require('../utils')
// class AccessService {
//     static signUp = async ({ name, email, username, password }) => {
//         try {
//             //check !email?

//             const holderUser = await userModel.findOne({ email }).lean();
//             if (holderUser) {
//                 return {
//                     code: 'xxxx',
//                     message: 'User already registered!',
//                 };
//             }
//             //create a password

//             const passwordHash = bcrypt.hash(password, 10);
//             const newUser = await userModel.create({
//                 name,
//                 email,
//                 username,
//                 password: passwordHash,
//                 avatar: req.file.location,
//             });

//             if (newUser) {
//                 //created privateKey, publicKey
//                 //const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', { modulusLength: 4096 });
//                 const privateKey = crypto.randomBytes(64).toString('hex')
//                 const publicKey = crypto.randomBytes(64).toString('hex')
//                 console.log( {privateKey, publicKey})

//                 //save publicKey into collection storeKey

//                 const keyStore =  await KeyTokenService.createKeyToken({
//                     userId: newUser._id,
//                     publicKey,
//                     privateKey
//                 })

//                 if(!keyStore) {
//                     return {
//                         code: 'xxxx',
//                         message: 'KeyStore error'
//                     }
//                 }
//                 //created pair token
//                 const tokens = await createTokenPair({
//                     userId: newUser._id,
//                     publicKey,
//                     privateKey
//                 })

//                 console.log(`Created Token success:::`, tokens)

//                 return {
//                     code: 201,
//                     metadata: {
//                         shop: getInfoData({fileds: ['_id', 'name', 'email'], object: newShop}), // function custome o utils khi dung lodash
//                         tokens,
//                       },
//                 }

//             }
//         } catch (error) {
//             return {
//                 code: 'xxxx',
//                 message: error.message,
//                 status: 'error',
//             };
//         }
//     };
// }

// module.exports = AccessService
