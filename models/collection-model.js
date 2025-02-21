const mongoose = require("mongoose");
const { Schema } = mongoose;
// const CollectableItemSchema = require("./collectable-model");

const CollectionSchema = new Schema({
  // user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  // userGameCollection: { type: [CollectableItemSchema], required: true },
});

module.exports = mongoose.model("Collection", CollectionSchema);
