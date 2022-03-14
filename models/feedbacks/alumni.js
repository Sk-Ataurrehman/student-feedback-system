const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  yearpassing: { type: String, requried: true },
  date: { type: String, required: true },
  department: { type: String, required: true },
  employer: { type: String, required: true },
  position: { type: String, required: true },
  proud: { type: String, required: true }, // marks from here
  activities: { type: String, required: true },
  contribute: { type: String, required: true },
  grievance: { type: String, required: true },
  equipments: { type: String, required: true },
  relevant: { type: String, required: true },
  technical: { type: String, required: true },
  placement: { type: String, required: true },
  association: { type: String, required: true },
  updates: { type: String, required: true },
  rate: { type: String, required: true },
  hospitality: { type: String, required: true },
  frequently: { type: String, required: true },
});

module.exports = mongoose.model("alumnifeedbacks", alumniSchema);
