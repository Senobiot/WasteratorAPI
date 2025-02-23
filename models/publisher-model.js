const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PublisherSchema = new Schema({
  name: { type: String },
  url: { type: String, unique: true },
});

module.exports = model("Publisher", PublisherSchema);
