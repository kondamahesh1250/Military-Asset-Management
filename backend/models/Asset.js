const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  assetName: String,
  quantity: Number,
  base: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Asset", assetSchema);