require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index')
const app = express();
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
  };
const errorMiddleware = require('./middlewares/error-middleware.js')
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/auth', router);
app.use(errorMiddleware);

const server = async (params) => {
    try {
        await mongoose.connect(process.env.URL);
        app.listen(process.env.PORT || 3000, () => console.log(`Server starts at port ${process.env.PORT}`));
    } catch (error) {
        console.log(error)
    }
}

server();