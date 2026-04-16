const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  assetName: String,
  assignedTo: String,
  quantity: Number,
  base: String,
  type: { type: String, enum: ["ASSIGNED", "EXPENDED"] },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Assignment", assignmentSchema);