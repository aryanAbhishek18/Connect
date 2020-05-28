const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config');

async function jwtSign(userMongoId) {
    try{
        const token = await jwt.sign({userMongoId: userMongoId }, jwtSecretKey);
        return token;
    }
    catch(e){
        console.log(e);
    }
}

module.exports = jwtSign;