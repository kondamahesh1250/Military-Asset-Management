const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ["ADMIN", "COMMANDER", "LOGISTICS"]
  }
});

module.exports = mongoose.model("User", userSchema);