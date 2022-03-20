const mongoose = require("mongoose");

const parentsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  acadyear: { type: String, requried: true },
  parentname: { type: String, requried: true },
  contact: { type: Number, requried: true },
  admission: { type: String, requried: true },
  infrastructure: { type: String, requried: true },
  library: { type: String, requried: true },
  canteen: { type: String, requried: true },
  sports: { type: String, requried: true },
  counseling: { type: String, requried: true },
  ict: { type: String, requried: true },
  discipline: { type: String, requried: true },
  improvements: { type: String, requried: true },
  adopted: { type: String, requried: true },
  evaluation: { type: String, requried: true },
  placements: { type: String, requried: true },
  suggestions: { type: String, required: true },
});

module.exports = mongoose.model("parents", parentsSchema);
