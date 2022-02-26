const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rollno: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  parent_email: { type: String, required: true },
  department: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("students", studentSchema);
