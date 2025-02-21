const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String },
  lastName: { type: String },
  birthday: { type: String },
  gender: { type: String },
  email: { type: String, unique: true, required: true },
  phone: { type: Number, },
  password: { type: String, required: true },
  hasActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

module.exports = model('User', UserSchema);
