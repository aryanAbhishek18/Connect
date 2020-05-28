const express = require('express');
const userModel = require('../models/user');
const jwtVerify = require('../utils/jwtVerify');
const bcryptHash = require('../utils/bcryptHash');

const router = express.Router();

router.post('/searchFriends', async (req, res) => {
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
        const userName = req.body.name;

        const usersMatched = await userModel.find({name: userName});

        if (!usersMatched) {
            return res.json({
                status: 401,
                message: 'No User Found!!'
            });
        }

        return res.json({
            status: 200,
            message: 'User found!',
            usersMatched: usersMatched
        });
    } catch (e) {
        console.log(e);
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});

router.post('/addFriend', async (req, res) => {
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
        const name1 = user.name;
        const email1 = user.email;

        const name2 = req.body.name;
        const email2 = req.body.email;

        const updatedUser1 = await userModel.findByIdAndUpdate(userMongoId, { $push: {
            "friends": {
                name: name2,
                email: email2
            }
        }});


        const updatedUser2 = await userModel.findOneAndUpdate({email: email2}, { $push: {
            "friends": {
                name: name1,
                email: email1
            }
        }});

        return res.json({
            status: 200,
            message: 'Friend added successfully!!'
        });
    } catch (e) {
        console.log(e);
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});


router.post('/getFriends', async (req, res) => {
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

        let user = await userModel.findById(userMongoId);

        return res.json({
            status: 200,
            message: 'Friends list retrieved successfully!!',
            friends: user.friends
        });
    } catch (e) {
        console.log(e);
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});


router.post('/getFriendDetails', async(req, res)=>{
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

        const email = req.body.email;

        const friend = await userModel.findOne({email: email});

        return res.json({
            status: 200,
            message: 'Friend details retrieved successfully!!',
            friend: friend
        });
    } catch (e) {
        console.log(e);
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});

module.exports = router;