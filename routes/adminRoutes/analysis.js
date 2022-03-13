var express = require("express");
var router = express.Router();

const Course = require("../../models/feedbacks/course");
const checkLogin = require("../../middlewares/check-login");

router.get("/course", checkLogin, (req, res, next) => {
  res.render("adminViews/analysis/course", { avgs: {}, noents: false });
});

router.post("/course", checkLogin, (req, res, next) => {
  Course.find({
    acadyear: req.body.acadyear,
    department: req.body.department,
    staff: req.body.staff,
  })
    .exec()
    .then((courses) => {
      if (courses.length < 1) {
        return res.render("adminViews/analysis/course", {
          avgs: {},
          noents: true,
        });
      }
      var sums = {
        punc: 0,
        accessibility: 0,
        sincerity: 0,
        behaviour: 0,
        knowledge: 0,
        engagement: 0,
        presentation: 0,
        interaction: 0,
        aids: 0,
        completion: 0,
        practices: 0,
        evolution: 0,
        ability: 0,
        overall: 0,
      };

      console.log(courses.length);
      courses.forEach((element) => {
        sums.punc += parseInt(element.punctuality);
        sums.accessibility += parseInt(element.accessibility);
        sums.sincerity += parseInt(element.sincerity);
        sums.behaviour += parseInt(element.behaviour);
        sums.knowledge += parseInt(element.knowledge);
        sums.engagement += parseInt(element.engagement);
        sums.presentation += parseInt(element.presentation);
        sums.interaction += parseInt(element.interaction);
        sums.aids += parseInt(element.aids);
        sums.completion += parseInt(element.completion);
        sums.practices += parseInt(element.practices);
        sums.evolution += parseInt(element.evolution);
        sums.ability += parseInt(element.ability);
        sums.overall += parseInt(element.overall);
      });
      console.log(sums);

      Object.keys(sums).map(function (key, index) {
        sums[key] /= courses.length;
      });
      console.log(sums);
      res.render("adminViews/analysis/course", { avgs: sums, noents: false });
    })
    .catch((err) => {
      res.render("error", { error: err, message: err.message });
    });
});

module.exports = router;
