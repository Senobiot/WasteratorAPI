const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const GameSchema = new Schema({
  inCollectionUsers: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  description: { type: String },
  developers: [{ type: Schema.Types.ObjectId, ref: "Developer" }],
  dls: { type: Array },
  genres: { type: Array },
  id: { type: Number, required: true },
  posterUrl: { type: String },
  screenshots: { type: Array },
  title: { type: String, required: true },
  platforms: { type: Array },
  publishers: [{ type: Schema.Types.ObjectId, ref: "Developer" }],
  release: { type: Number },
  ratingMpaa: { type: Array },
  type: { type: String, required: true },
});

module.exports = mongoose.model("Game", GameSchema);
