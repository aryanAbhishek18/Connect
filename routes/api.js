const express = require('express');
const router = express.Router();

const authenticate = require('./authenticate');
const profile = require('./profile');
const friends = require('./friends');
const messaging = require('./messaging');


router.use('/authenticate', authenticate);
router.use('/profile', profile);
router.use('/friends', friends);
router.use('/messaging', messaging);


module.exports = router;