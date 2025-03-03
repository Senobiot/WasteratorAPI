const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String },
  lastName: { type: String },
  birthday: { type: String },
  gender: { type: String },
  email: { type: String, unique: true, required: true },
  phone: { type: Number },
  password: { type: String, required: true },
  hasActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  gamesCollection: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  gamesCollectionIds: [Number],
  filmsCollection: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

module.exports = model("User", UserSchema);
