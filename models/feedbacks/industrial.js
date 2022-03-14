const mongoose = require("mongoose");

const industrialSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  acadyear: { type: String, requried: true },
  place: { type: String, requried: true },
  date: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  outcomes: { type: String, required: true },
  content: { type: String, required: true },
  knowledge: { type: String, required: true }, // marks from here
  duration: { type: String, required: true },
  suggestion: { type: String, required: true },
});

module.exports = mongoose.model("industrials", industrialSchema);
