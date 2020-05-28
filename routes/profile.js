const express = require('express');
const userModel = require('../models/user');
const jwtVerify = require('../utils/jwtVerify');
const bcryptHash = require('../utils/bcryptHash');

const router = express.Router();

router.post('/getProfile', async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.json({
                status: 403,
                message: 'Token missing!!'
            });
        }

        const userMongoId = await jwtVerify(token);
        if(!userMongoId) {
            return res.json({
                status: 500,
                message: 'Internal server error while verifying the token!!'
            });
        }

        const user = await userModel.findById(userMongoId);
        if (!user) {
            return res.json({
                status: 401,
                message: 'Invalid user id!!'
            });
        }

        return res.json({
            status: 200,
            message: 'User found!',
            user: user
        });
    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});




router.post('/changePassword', async (req, res, next) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.json({
                status: 403,
                message: 'Token missing!!'
            });
        }

        const newPass = req.body.password;
        if (!newPass) {
            return res.json({
                status: 401,
                message: 'New password missing!!'
            });
        }
        next();
    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal1 server error!!'
        });
    }
}, bcryptHash, async (req, res) => {
    try {
        const newHashedPassword = req.hashedPassword;
        const userMongoId = await jwtVerify(req.body.token);
        if(!userMongoId) {
            return res.json({
                status: 500,
                message: 'Internal server error while verifying the token!!'
            });
        }

        const updatedUser = await userModel.findOneAndUpdate({
            _id: userMongoId
        }, {
            password: newHashedPassword
        });
        if (updatedUser) {
            return res.json({
                status: 200,
                message: 'Password updated successfully!!'
            });
        } else {
            return res.json({
                status: 500,
                message: 'Internal2 server error!!'
            });
        }
    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal3 server error!!'
        });
    }
});





router.post('/updateProfile', async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.json({
                status: 403,
                message: 'Token missing!!'
            });
        }

        const userMongoId = await jwtVerify(token);
        if(!userMongoId) {
            return res.json({
                status: 500,
                message: 'Internal server error while verifying the token!!'
            });
        }

        const dob = req.body.dob;
        const address = req.body.address;
        const phone = req.body.phone;
        const hobby = req.body.hobby;

        const updatedUser = await userModel.findByIdAndUpdate(userMongoId, { $set: {
            dob: dob,
            address: address,
            phone: phone,
            hobby: hobby  
        }});


        return res.json({
            status: 200,
            message: 'User details updated successfully!'
        });
    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});

module.exports = router;