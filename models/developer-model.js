const mongoose = require("mongoose");
const { Schema } = mongoose;

const DeveloperSchema = new Schema({
  id: { type: Number},
  name: { type: String},
  detailsUrl: { type: String},
});

module.exports = model('Developer', DeveloperSchema);
