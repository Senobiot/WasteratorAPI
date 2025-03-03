const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PublisherSchema = new Schema({
  name: { type: String },
  id: { type: Number, unique: true },
});

module.exports = model("Publisher", PublisherSchema);
