const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config');

async function jwtVerify(token) {
    try{
        const decoded = await jwt.verify(token, jwtSecretKey);
        if (!decoded.userMongoId) {
            return null;
        }
        return decoded.userMongoId;
    }
    catch(e){
        console.log(e);
        return null;
    }
}

module.exports = jwtVerify;