const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const searchItemSchema = new Schema({
  detailUrl: { type: String },
  release: { type: String },
  name: { type: String },
  id: { type: Number },
  logoUrl: { type: String },
  inCollection: { type: Boolean },
});

const GamesSearchListSchema = new Schema({
  searchQuery: { type: String },
  list: [searchItemSchema],
});

module.exports = mongoose.model("GamesSearchList", GamesSearchListSchema);
