'use strict'

////const {createTokenPair} = require('../auth/authUtils')
const sendCookie = (user = {}, statusCode, res) => {
    const token = 'this is cookie'
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 1000
        ),
        httpOnly: true
    }
    console.log(`send cookie success::::`, req.cookie)
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
    })

}

module.exports = sendCookie