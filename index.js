require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRouter = require("./router/authRouter");
const gamesRouter = require("./router/gamesRouter");
const moviesRouter = require("./router/moviesRouter");
const collectionRouter = require("./router/collectionRouter");
const app = express();
const corsOptions = {
  origin: process.env.REACT_APP_URL,
  credentials: true,
};
const errorMiddleware = require("./middlewares/error-middleware.js");
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/games", gamesRouter);
app.use("/movies", moviesRouter);
app.use("/collection", collectionRouter);
app.use(errorMiddleware);

const server = async (params) => {
  try {
    await mongoose.connect(process.env.URL);
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server starts at port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

server();
