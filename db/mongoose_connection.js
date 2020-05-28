const mongoose = require('mongoose');
const { mongoURL } = require('../config');

async function connectDB() {
    const db_options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    };
    mongoose.connect(mongoURL, db_options);
    mongoose.connection.once('open', function () {
        console.log("Database connection opened");
    });
    
    mongoose.connection.on('error', function (error) {
        console.log("Database connection error");
    });
    
    mongoose.connection.on('reconnected', function () {
        console.log("Database reconnected");
    });
    
    mongoose.connection.on('disconnected', function () {
        console.log("Database disconnected");
        mongoose.connect(mongoURL, { useNewUrlParser: true });
    });
}

module.exports = connectDB;