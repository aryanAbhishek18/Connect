const express = require('express');
const userModel = require('../models/user');
const jwtVerify = require('../utils/jwtVerify');
const bcryptHash = require('../utils/bcryptHash');

const router = express.Router();

router.post('/sendMessage', async (req, res) => {
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
        const message = req.body.message;

        const email2 = req.body.email;
        const date = new Date().toDateString();

        const updatedUser2 = await userModel.findOneAndUpdate({email: email2}, { $push: {
            "messages": {
                name: name1,
                email: email1,
                message: message,
                date: date
            }
        }});

        return res.json({
            status: 200,
            message: 'Message sent successfully!!'
        });
    } catch (e) {
        console.log(e);
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});


router.post('/getReceivedMessages', async (req, res) => {
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

        return res.json({
            status: 200,
            message: 'Messages received successfully!!',
            messages: user.messages
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