const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String },
    lastName: { type: String },
    birthday: { type: String },
    gender: { type: String },
    email: { type: String, unique: true, required: true },
    phone: { type: Number },
    password: { type: String, required: true },
    hasActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    gamesCollection: {
      list: [
        {
          game: {
            type: Schema.Types.ObjectId,
            ref: "Game",
            unique: true
          },
          time: { type: Number, default: 0 },
        },
      ],
      ids: [{ type: Number, unique: true }],
    },
    moviesCollection: {
      list: [
        {
          movie: {
            type: Schema.Types.ObjectId,
            ref: "Movie",
            unique: true
          },
          time: { type: Number, default: 0 },
        },
      ],
      ids: [{ type: Number, unique: true }],
    },
  },
  { versionKey: false }
);

module.exports = model("User", UserSchema);
