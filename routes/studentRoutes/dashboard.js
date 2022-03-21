var express = require("express");
var router = express.Router();

var checkStudent = require("../../middlewares/check-student-login");

const Course = require("../../models/feedbacks/course");
const Internship = require("../../models/feedbacks/internship");
const Industrial = require("../../models/feedbacks/industrial");
const Alumni = require("../../models/feedbacks/alumni");
const Exit = require("../../models/feedbacks/exit");
const Parent = require("../../models/feedbacks/parent");
const Seminar = require("../../models/feedbacks/seminar");

router.get("/", checkStudent, async (req, res, next) => {
  const coursearr = await Course.find();
  const internshiparr = await Internship.find();
  const industrialarr = await Industrial.find();
  const alumniarr = await Alumni.find();
  const exitarr = await Exit.find();
  const parentarr = await Parent.find();
  const seminararr = await Seminar.find();

  var total =
    coursearr.length +
    internshiparr.length +
    industrialarr.length +
    alumniarr.length +
    exitarr.length +
    parentarr.length +
    seminararr.length;

  res.render("studentViews/dashboard", { total: total });
});

module.exports = router;
