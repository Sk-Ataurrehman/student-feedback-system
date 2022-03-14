const mongoose = require("mongoose");

const seminarSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  acadyear: { type: String, requried: true },
  place: { type: String, requried: true },
  date: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  topic: { type: String, required: true },
  outcomes: { type: String, required: true }, // marks from here
  content: { type: String, required: true },
  session: { type: String, required: true },
  duration: { type: String, required: true },
  nexttopic: { type: String, required: true },
  newskills: { type: String, required: true },
});

module.exports = mongoose.model("seminars", seminarSchema);
