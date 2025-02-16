const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  birthday: { type: String },
  phone: { type: Number, },
  hasActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

module.exports = model('User', UserSchema);
