const mongoose = require("mongoose");

const exitSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  yearpassing: { type: String, requried: true },
  date: { type: String, required: true },
  department: { type: String, required: true },
  status: { type: String, required: true },
  prepared: { type: String, required: true }, //marks 1
  confidence: { type: String, required: true },
  competencies: { type: String, required: true },
  otherskills: { type: String, required: true },
  activities: { type: String, required: true },
  achievements: { type: String, required: true },
  values: { type: String, required: true }, //marks2
  liked: { type: String, required: true },
  model: { type: String, required: true },
  inspiring: { type: String, required: true },
  hod: { type: String, required: true }, //marks 3
  faculty: { type: String, required: true },
  nonteaching: { type: String, required: true },
  library: { type: String, required: true },
  laboratories: { type: String, required: true },
  administration: { type: String, required: true },
  tpo: { type: String, required: true },
  placement: { type: String, required: true },
  discipline: { type: String, required: true },
  environment: { type: String, required: true },
  canteen: { type: String, required: true },
  water: { type: String, required: true },
  internet: { type: String, required: true },
  cleanliness: { type: String, required: true },
  resolution: { type: String, required: true },
  suggestions: { type: String, required: true },
});

module.exports = mongoose.model("exit", exitSchema);
