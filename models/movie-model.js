const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const MovieSchema = new Schema(
  {
    inCollectionUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    actors: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
    originalName: { type: String },
    backgroundUrl: { type: String },
    budget: { type: Object },
    countries: { type: Array },
    description: { type: String },
    fees: { type: Array },
    genres: { type: Array },
    id: { type: Number, required: true },
    isInCollection: { type: Boolean, default: false },
    isSeries: { type: Boolean },
    length: { type: Number },
    logoUrl: { type: String },
    imageUrl: { type: String },
    posterUrl: { type: String },
    rating: { type: Array },
    ratingMpaa: { type: String },
    seasonsInfo: { type: Array },
    seriesLength: { type: Number },
    name: { type: String },
    top250: { type: Number },
    trailers: { type: Array },
    votesImdb: { type: String },
    votesKp: { type: String },
    year: { type: Number },
    watchability: { type: Array },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Movie", MovieSchema);
