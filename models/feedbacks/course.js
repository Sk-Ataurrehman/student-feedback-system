const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  acadyear: { type: String, requried: true },
  date: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  staff: { type: String, required: true },
  punctuality: { type: String, required: true }, // marks from here
  accessibility: { type: String, required: true },
  sincerity: { type: String, required: true },
  behaviour: { type: String, required: true },
  knowledge: { type: String, required: true },
  engagement: { type: String, required: true },
  presentation: { type: String, required: true },
  interaction: { type: String, required: true },
  aids: { type: String, required: true },
  completion: { type: String, required: true },
  practices: { type: String, required: true },
  evolution: { type: String, required: true },
  ability: { type: String, required: true },
  overall: { type: String, required: true },

  displayed: { type: String, required: true }, //form2
  test: { type: String, required: true },
  marks: { type: String, required: true },
  curriculum: { type: String, required: true },
  assessed: { type: String, required: true },
  classtest: { type: String, required: true },

  suggestions: { type: String, required: true },
});

module.exports = mongoose.model("courses", courseSchema);
