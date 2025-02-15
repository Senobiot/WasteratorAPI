require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index')
const app = express();


app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/auth', router);

const server = async (params) => {
    try {
        await mongoose.connect(process.env.URL);
        app.listen(process.env.PORT || 3000, () => console.log(`Server starts at port ${process.env.PORT}`));
    } catch (error) {
        console.log(error)
    }
}

server();