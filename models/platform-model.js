const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PlatformSchema = new Schema({
  name: { type: String, unique: true },
  id: { type: Number, unique: true },
});

module.exports = model("Platform", PlatformSchema);
