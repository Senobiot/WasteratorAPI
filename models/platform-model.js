const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PlatformSchema = new Schema({
  name: { type: String, unique: true },
  id: { type: Number, unique: true },
},{ versionKey: false });

module.exports = model("Platform", PlatformSchema);
