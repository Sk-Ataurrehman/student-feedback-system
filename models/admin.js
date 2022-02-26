const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, requried: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("admins", adminSchema);
