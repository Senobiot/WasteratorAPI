const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PublisherSchema = new Schema(
  {
    name: { type: String, unique: true },
  },
  { versionKey: false }
);

module.exports = model("Publisher", PublisherSchema);
