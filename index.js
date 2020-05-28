const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
let { port } = require('./config');
const connectDB = require('./db/mongoose_connection');

//routes handler
const api = require('./routes/api');

const app = express();

//db
connectDB();


//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', api);



port = process.env.PORT || port;
app.listen(port, ()=>{
    console.log(`Server running on port ${port} ...`);
});