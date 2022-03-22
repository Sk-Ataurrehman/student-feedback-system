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

  var positive = 0;

  coursearr.forEach((element) => {
    var avg =
      (parseInt(element.punctuality) +
        parseInt(element.accessibility) +
        parseInt(element.sincerity) +
        parseInt(element.behaviour) +
        parseInt(element.knowledge) +
        parseInt(element.engagement) +
        parseInt(element.presentation) +
        parseInt(element.interaction) +
        parseInt(element.aids) +
        parseInt(element.completion) +
        parseInt(element.practices) +
        parseInt(element.evolution) +
        parseInt(element.ability) +
        parseInt(element.overall)) /
      14;
    if (avg > 2.5) positive += 1;
  });

  internshiparr.forEach((element) => {
    var avgin =
      (parseInt(element.outcomes) +
        parseInt(element.contents) +
        parseInt(element.session) +
        parseInt(element.duration) +
        parseInt(element.informative)) /
      5;
    if (avgin > 2.5) positive += 1;
  });

  industrialarr.forEach((element) => {
    var avgind =
      (parseInt(element.outcomes) +
        parseInt(element.contents) +
        parseInt(element.knowledge) +
        parseInt(element.duration)) /
      4;
    if (avgind > 2.5) positive += 1;
  });

  alumniarr.forEach((element) => {
    var avgal =
      (parseInt(element.proud) +
        parseInt(element.activities) +
        parseInt(element.contribute) +
        parseInt(element.grievance) +
        parseInt(element.equipments) +
        parseInt(element.relevant) +
        parseInt(element.technical) +
        parseInt(element.placement) +
        parseInt(element.association) +
        parseInt(element.updates) +
        parseInt(element.rate) +
        parseInt(element.hospitality)) /
      12;
    if (avgal > 2.5) positive += 1;
  });

  exitarr.forEach((element) => {
    var avgex =
      (parseInt(element.prepared) +
        parseInt(element.confidence) +
        parseInt(element.competencies) +
        parseInt(element.hod) +
        parseInt(element.faculty) +
        parseInt(element.nonteaching) +
        parseInt(element.library) +
        parseInt(element.laboratories) +
        parseInt(element.administration) +
        parseInt(element.tpo) +
        parseInt(element.placement) +
        parseInt(element.discipline) +
        parseInt(element.environment) +
        parseInt(element.canteen) +
        parseInt(element.water) +
        parseInt(element.internet) +
        parseInt(element.cleanliness) +
        parseInt(element.resolution)) /
      18;
    if (avgex > 2.5) positive += 1;
  });

  parentarr.forEach((element) => {
    var avgpa =
      (parseInt(element.admission) +
        parseInt(element.infrastructure) +
        parseInt(element.library) +
        parseInt(element.canteen) +
        parseInt(element.sports) +
        parseInt(element.counseling) +
        parseInt(element.ict) +
        parseInt(element.discipline) +
        parseInt(element.improvements) +
        parseInt(element.adopted) +
        parseInt(element.evaluation) +
        parseInt(element.placements)) /
      12;
    if (avgpa > 2.5) positive += 1;
  });

  seminararr.forEach((element) => {
    var avgsem =
      (parseInt(element.outcomes) +
        parseInt(element.content) +
        parseInt(element.session) +
        parseInt(element.duration)) /
      4;
    if (avgsem > 2.5) positive += 1;
  });

  res.render("studentViews/dashboard", { total: total, positive: positive });
});

module.exports = router;
