const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const MovieSchema = new Schema({
  inCollectionUsers: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],
  alternativeName: { type: String },
  backgroundImageUrl: { type: Array },
  budget: { type: Object },
  countries: { type: Array },
  description: { type: String },
  fees: { type: Object },
  genres: { type: Array },
  id: { type: Number, required: true },
  isInCollection: { type: Boolean, default: false },
  isSeries: { type: Boolean },
  length: { type: Number },
  logoUrl: { type: String },
  posterUrl: { type: String },
  rating: { type: Array },
  ratingMpaa: { type: Array },
  seasonsInfo: { type: Object },
  seriesLength: { type: Number },
  title: { type: String, required: true },
  top250: { type: Number, default: null },
  trailers: { type: Array },
  type: { type: String, required: true },
  votes: { type: Object },
  year: { type: Number },
});

module.exports = mongoose.model("Movie", MovieSchema);
