const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const gameItemSchema = new Schema(
  {
    id: { type: Number },
    genres: [String],
    release: { type: String },
    name: { type: String },
    imageUrl: { type: String },
    inCollection: { type: Boolean },
    platforms: [String],
    ratingMetacritic: { type: Number },
    rating: { type: Number },
    ratingTop: { type: Number },
    added: { type: Number },
    stores: [String],
    screenshots: [String],
  },
  { versionKey: false }
);

const GamesSearchListSchema = new Schema(
  {
    searchQuery: { type: String, unique: true },
    list: [gameItemSchema],
  },
  { versionKey: false }
);

module.exports = {
  GamesSearchList: mongoose.model("GamesSearchList", GamesSearchListSchema),
  gameItemSchema: gameItemSchema,
};
