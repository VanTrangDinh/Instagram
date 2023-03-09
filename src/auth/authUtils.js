'use strict';
//publicKey phải lấy từ mongoDb chứ k lấy được lại từ tạo ra
const JWT = require('jsonwebtoken');
const createTokenPair = async (payload, publicKey, privateKey) => {
    //dung publicKey để giải mã

    //acesstoke
    //payload chứa thông tin vận chuyển mang đi từ hệ thống này qua hệ thống khác thông qua accesstoken
    //privateKey không lưu vào database, nó chỉ diễn ra một lần khi login ,sign thành công thì nó đẩy qua browser
    // Nhưng publicKey phải lưu vào databse(mongo)
    const accessToken = await JWT.sign(payload, publicKey, {
        expiresIn: process.env.ACCESSTOKEN_EXPIRE,
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
        expiresIn: process.env.REFRESHTOKEN_EXPIRE,
    });

    //không nên sử dụng keysecret để verify thì rất nguy hiểm, nếu người hacker biết verify sign và tạo ra được sign luôn

    // JWT.verify(accessToken, publicKey, (err, decode) => {
    //     if (err) {
    //         console.log(`Error verify::::`, err);
    //     } else {
    //         console.log(`decode verify:::`, decode);
    //     }
    // });
    return { accessToken, refreshToken };
};

const verfyAccessToken = (req, res, next) => {
    
}

module.exports = {
    createTokenPair,
};
