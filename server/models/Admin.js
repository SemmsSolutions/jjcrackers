const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: String,
  password: String, // will be hashed
});

module.exports = mongoose.model("Admin", adminSchema);
