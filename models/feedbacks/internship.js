const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  acadyear: { type: String, requried: true },
  place: { type: String, requried: true },
  date: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  outcomes: { type: String, required: true },
  contents: { type: String, required: true },
  session: { type: String, required: true }, // marks from here
  duration: { type: String, required: true },
  informative: { type: String, required: true },
  newskills: { type: String, required: true },
});

module.exports = mongoose.model("internships", internshipSchema);
