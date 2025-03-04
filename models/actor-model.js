const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ActorSchema = new Schema({
  id: { type: Number, unique: true },
  enName: { type: String },
  name: { type: String },
  enProfession: { type: String },
  profession: { type: String },
  photo: { type: String },
  description: { type: String },
},{ versionKey: false });

module.exports = model("Actor", ActorSchema);
