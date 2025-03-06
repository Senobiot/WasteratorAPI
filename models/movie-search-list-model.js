const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movieItemSchema = new Schema(
  {
    countries: { type: [String] },
    genres: { type: [String] },
    id: { type: Number, required: true },
    imageUrl: { type: String },
    inCollection: { type: Boolean },
    isSeries: { type: Boolean },
    length: { type: Number },
    name: { type: String, required: true },
    originalName: { type: String },
    ratingImdb: { type: Number },
    ratingKp: { type: Number },
    release: { type: Number },
  },
  { versionKey: false }
);

const MoviesSearchListSchema = new Schema(
  {
    searchQuery: { type: String, unique: true },
    list: [movieItemSchema],
  },
  { versionKey: false }
);

module.exports = {
  MoviesSearchList: mongoose.model("MoviesSearchList", MoviesSearchListSchema),
  movieItemSchema,
};
