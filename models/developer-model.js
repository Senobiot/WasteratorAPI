const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DeveloperSchema = new Schema(
  {
    name: { type: String, unique: true },
  },
  { versionKey: false }
);

module.exports = model("Developer", DeveloperSchema);
