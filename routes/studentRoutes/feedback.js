var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

var checkLogin = require("../../middlewares/check-student-login");

const Course = require("../../models/feedbacks/course");
const Internship = require("../../models/feedbacks/internship");
const Industrial = require("../../models/feedbacks/industrial");
const Seminar = require("../../models/feedbacks/seminar");

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

module.exports = router;
