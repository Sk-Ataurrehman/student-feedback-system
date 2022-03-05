var express = require("express");
var router = express.Router();

var checkLogin = require("../../middlewares/check-student-login");

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

module.exports = router;
