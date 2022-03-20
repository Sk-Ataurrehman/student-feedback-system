var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

var checkLogin = require("../../middlewares/check-student-login");

const Course = require("../../models/feedbacks/course");
const Internship = require("../../models/feedbacks/internship");
const Industrial = require("../../models/feedbacks/industrial");
const Seminar = require("../../models/feedbacks/seminar");
const Alumni = require("../../models/feedbacks/alumni");
const Exit = require("../../models/feedbacks/exit");
const Parent = require("../../models/feedbacks/parent");

router.get("/course", checkLogin, (req, res, next) => {
  res.render("studentViews/feedbacks/course");
});

router.get("/internship", checkLogin, (req, res, next) => {
  res.render("studentViews/feedbacks/internship");
});

router.get("/industrial-visit", checkLogin, (req, res, next) => {
  res.render("studentViews/feedbacks/industrial");
});

router.get("/seminar", checkLogin, (req, res, next) => {
  res.render("studentViews/feedbacks/seminar");
});

router.get("/alumni", checkLogin, (req, res, next) => {
  res.render("studentViews/feedbacks/alumni");
});

router.get("/exit", checkLogin, (req, res, next) => {
  res.render("studentViews/feedbacks/exit");
});

router.get("/parent", checkLogin, (req, res, next) => {
  res.render("studentViews/feedbacks/parent");
});

router.post("/course", checkLogin, (req, res, next) => {
  const course = new Course({
    _id: new mongoose.Types.ObjectId(),
    acadyear: req.body.acadyear,
    date: req.body.date,
    department: req.body.department,
    semester: req.body.semester,
    subject: req.body.subject,
    staff: req.body.staff,
    punctuality: req.body.punctuality, // marks from here
    accessibility: req.body.accessibility,
    sincerity: req.body.sincerity,
    behaviour: req.body.behaviour,
    knowledge: req.body.knowledge,
    engagement: req.body.engagement,
    presentation: req.body.skills,
    interaction: req.body.interaction,
    aids: req.body.aids,
    completion: req.body.completion,
    practices: req.body.practices,
    evolution: req.body.test,
    ability: req.body.discipline,
    overall: req.body.overall,
    suggestions: req.body.suggestion,
  });

  course
    .save()
    .then((result) => {
      res.redirect("/student-feedback/dashboard");
    })
    .catch((err) => {
      console.log(err);
      res.render("error", { error: err, message: err.message });
    });
});

router.post("/internship", checkLogin, (req, res, next) => {
  const internship = new Internship({
    _id: new mongoose.Types.ObjectId(),
    acadyear: req.body.acadyear,
    place: req.body.place,
    date: req.body.date,
    department: req.body.department,
    semester: req.body.semester,
    outcomes: req.body.outcomes, // marks from here
    contents: req.body.content,
    session: req.body.session,
    duration: req.body.duration,
    informative: req.body.informative,
    newskills: req.body.newskills,
  });
  console.log(internship);
  internship
    .save()
    .then((result) => {
      res.redirect("/student-feedback/dashboard");
    })
    .catch((err) => {
      console.log(err);
      res.render("error", { error: err, message: err.message });
    });
});

router.post("/internship", checkLogin, (req, res, next) => {
  const internship = new Internship({
    _id: new mongoose.Types.ObjectId(),
    acadyear: req.body.acadyear,
    place: req.body.place,
    date: req.body.date,
    department: req.body.department,
    semester: req.body.semester,
    outcomes: req.body.outcomes, // marks from here
    contents: req.body.content,
    session: req.body.session,
    duration: req.body.duration,
    informative: req.body.informative,
    newskills: req.body.newskills,
  });
  console.log(internship);
  internship
    .save()
    .then((result) => {
      res.redirect("/student-feedback/dashboard");
    })
    .catch((err) => {
      console.log(err);
      res.render("error", { error: err, message: err.message });
    });
});

router.post("/industrial", checkLogin, (req, res, next) => {
  const industrial = new Industrial({
    _id: new mongoose.Types.ObjectId(),
    acadyear: req.body.acadyear,
    place: req.body.place,
    date: req.body.date,
    department: req.body.department,
    semester: req.body.semester,
    outcomes: req.body.outcomes, // marks from here
    content: req.body.content,
    knowledge: req.body.knowledge,
    duration: req.body.duration,
    suggestion: req.body.suggestion,
  });
  console.log(industrial);
  industrial
    .save()
    .then((result) => {
      res.redirect("/student-feedback/dashboard");
    })
    .catch((err) => {
      console.log(err);
      res.render("error", { error: err, message: err.message });
    });
});

router.post("/seminar", checkLogin, (req, res, next) => {
  const seminar = new Seminar({
    _id: new mongoose.Types.ObjectId(),
    acadyear: req.body.acadyear,
    place: req.body.place,
    date: req.body.date,
    department: req.body.department,
    semester: req.body.semester,
    topic: req.body.topicname,
    outcomes: req.body.outcomes, // marks from here
    content: req.body.content,
    session: req.body.session,
    duration: req.body.duration,
    nexttopic: req.body.nexttopic,
    newskills: req.body.newskills,
  });
  console.log(seminar);
  seminar
    .save()
    .then((result) => {
      res.redirect("/student-feedback/dashboard");
    })
    .catch((err) => {
      console.log(err);
      res.render("error", { error: err, message: err.message });
    });
});

router.post("/alumni", checkLogin, (req, res, next) => {
  const alumni = new Alumni({
    _id: new mongoose.Types.ObjectId(),
    yearpassing: req.body.yearpassing,
    date: req.body.date,
    department: req.body.department,
    employer: req.body.employer,
    position: req.body.position,
    proud: req.body.proud, // marks from here
    activities: req.body.activities,
    contribute: req.body.contribute,
    grievance: req.body.grievance,
    equipments: req.body.equipments,
    relevant: req.body.relevant,
    technical: req.body.technical,
    placement: req.body.placement,
    association: req.body.association,
    updates: req.body.updates,
    rate: req.body.rate,
    hospitality: req.body.hospitality,
    frequently: req.body.frequently,
  });

  alumni
    .save()
    .then((result) => {
      res.redirect("/student-feedback/dashboard");
    })
    .catch((err) => {
      console.log(err);
      res.render("error", { error: err, message: err.message });
    });
});

router.post("/exit", checkLogin, (req, res, next) => {
  const exit = new Exit({
    _id: new mongoose.Types.ObjectId(),
    yearpassing: req.body.yearpassing,
    date: req.body.date,
    department: req.body.department,
    status: req.body.status,
    position: req.body.position,
    prepared: req.body.prepared, // marks from here
    confidence: req.body.confidence,
    competencies: req.body.competencies,
    otherskills: req.body.otherskills,
    activities: req.body.activities,
    achievements: req.body.achievements,
    values: req.body.values,
    liked: req.body.liked,
    model: req.body.model,
    inspiring: req.body.inspiring,
    hod: req.body.hod,
    faculty: req.body.faculty,
    nonteaching: req.body.nonteaching,
    library: req.body.library,
    laboratories: req.body.laboratories,
    administration: req.body.administration,
    tpo: req.body.tpo,
    placement: req.body.placement,
    discipline: req.body.discipline,
    environment: req.body.environment,
    canteen: req.body.canteen,
    water: req.body.water,
    internet: req.body.internet,
    cleanliness: req.body.cleanliness,
    resolution: req.body.resolution,
    suggestions: req.body.suggestions,
  });
  console.log(exit);
  exit
    .save()
    .then((result) => {
      res.redirect("/student-feedback/dashboard");
    })
    .catch((err) => {
      console.log(err);
      res.render("error", { error: err, message: err.message });
    });
});

router.post("/parent", checkLogin, (req, res, next) => {
  const parent = new Parent({
    _id: new mongoose.Types.ObjectId(),
    acadyear: req.body.acadyear,
    parentname: req.body.parentname,
    admission: req.body.admission,
    infrastructure: req.body.infrastructure,
    library: req.body.library,
    canteen: req.body.canteen,
    sports: req.body.sports,
    counseling: req.body.counseling,
    ict: req.body.ict, // marks from here
    discipline: req.body.discipline,
    improvements: req.body.improvements,
    adopted: req.body.adopted,
    evaluation: req.body.evaluation,
    placements: req.body.placements,
    suggestions: req.body.suggestion,
  });

  console.log(parent);
  parent
    .save()
    .then((result) => {
      res.redirect("/student-feedback/dashboard");
    })
    .catch((err) => {
      console.log(err);
      res.render("error", { error: err, message: err.message });
    });
});

module.exports = router;
