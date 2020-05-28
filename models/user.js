const mongoose = require('mongoose');
const schema = mongoose.Schema;

const friendSchema = new schema({
    name: {
        type: String
    },
    email: {
        type: String
    }
});
const messageSchema = new schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    date: {
        type: String
    }
});

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    hobby: {
        type:String,
        default: ''
    },
    friends: {
        type: [friendSchema],
        default: []
    },
    messages: {
        type: [messageSchema],
        default: []
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;