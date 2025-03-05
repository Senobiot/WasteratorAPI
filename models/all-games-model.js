const mongoose = require("mongoose");
const { gameItemSchema } = require("./game-search-list-model");
const { Schema, model } = mongoose;

const AllGamesListSchema = new Schema(
  {
    page: { type: Number },
    list: [gameItemSchema],
  },
  { versionKey: false }
);

module.exports = model("AllGamesList", AllGamesListSchema);
