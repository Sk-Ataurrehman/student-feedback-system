var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

var checkLogin = require("../../middlewares/check-student-login");
const Course = require("../../models/feedbacks/course");

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

module.exports = router;
