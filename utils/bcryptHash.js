const bcrypt = require('bcryptjs');

function bcryptHash (req, res, next) {
    const password = req.body.password;
    bcrypt.genSalt(10, function(err, salt) {
        if(err){
            return res.json({ 
                status: 500,
                message: 'Internal server error!'
            });
        }
        bcrypt.hash(password, salt, function(err, hash) {
            if(err){
                return res.json({ 
                    status: 500,
                    message: 'Internal server error!'
                });
            }
            req.hashedPassword = hash;
            next();
        });
    });
}

module.exports = bcryptHash;