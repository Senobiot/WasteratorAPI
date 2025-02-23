const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const GameSchema = new Schema(
  {
    inCollectionUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    description: { type: String },
    developers: [{ type: Schema.Types.ObjectId, ref: "Developer" }],
    descriptionHtml: { type: String },
    detailsUrl: { type: String },
    genres: [String],
    id: { type: Number },
    imageUrl: { type: String },
    inCollection: { type: Boolean, default: false },
    name: { type: String },
    platforms: [{ type: Schema.Types.ObjectId, ref: "Platform" }],
    publishers: [{ type: Schema.Types.ObjectId, ref: "Publisher" }],
    ratingMpaa: [String],
    release: { type: String },
    screenshots: [String],
  },
  { versionKey: false }
);

module.exports = model("Game", GameSchema);
