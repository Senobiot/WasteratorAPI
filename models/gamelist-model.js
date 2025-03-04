const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const searchItemSchema = new Schema({
  detailsUrl: { type: String },
  release: { type: String },
  name: { type: String },
  id: { type: Number },
  logoUrl: { type: String },
  inCollection: { type: Boolean },
},{ versionKey: false });

const GamesSearchListSchema = new Schema({
  searchQuery: { type: String },
  list: [searchItemSchema],
},{ versionKey: false });

module.exports = mongoose.model("GamesSearchList", GamesSearchListSchema);
