const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AllGamesListSchema = new Schema({
  page: { type: Number },
  list: [Object],
});

module.exports = model("AllGamesList", AllGamesListSchema);
