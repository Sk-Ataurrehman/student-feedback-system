var express = require("express");
var router = express.Router();

const Course = require("../../models/feedbacks/course");
const Internship = require("../../models/feedbacks/internship");
const Industrial = require("../../models/feedbacks/industrial");
const Seminar = require("../../models/feedbacks/seminar");
const Alumni = require("../../models/feedbacks/alumni");
const Exit = require("../../models/feedbacks/exit");

const checkLogin = require("../../middlewares/check-login");

router.get("/course", checkLogin, (req, res, next) => {
  res.render("adminViews/analysis/course", { avgs: {}, noents: false });
});

router.get("/internship", checkLogin, (req, res, next) => {
  res.render("adminViews/analysis/internship", { avgsint: {}, noents: false });
});

router.get("/industrial", checkLogin, (req, res, next) => {
  res.render("adminViews/analysis/industrial", { avgsind: {}, noents: false });
});

router.get("/seminar", checkLogin, (req, res, next) => {
  res.render("adminViews/analysis/seminar", { avgssem: {}, noents: false });
});

router.get("/alumni", checkLogin, (req, res, next) => {
  res.render("adminViews/analysis/alumni", { avgsal: {}, noents: false });
});

router.get("/exit", (req, res, next) => {
  res.render("adminViews/analysis/exit", { avgsex: {}, noents: false });
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

router.post("/internship", checkLogin, (req, res, next) => {
  Internship.find({
    acadyear: req.body.acadyear,
    place: req.body.place,
    date: req.body.date,
    department: req.body.department,
  })
    .exec()
    .then((internships) => {
      if (internships.length < 1) {
        return res.render("adminViews/analysis/internship", {
          avgsint: {},
          noents: true,
        });
      }
      var sumsint = {
        outcomes: 0,
        contents: 0,
        session: 0,
        duration: 0,
        informative: 0,
      };

      console.log(internships[0].contents);
      internships.forEach((element) => {
        sumsint.outcomes += parseInt(element.outcomes);
        sumsint.contents += parseInt(element.contents);
        sumsint.session += parseInt(element.session);
        sumsint.duration += parseInt(element.duration);
        sumsint.informative += parseInt(element.informative);
      });
      console.log(sumsint);

      Object.keys(sumsint).map(function (key, index) {
        sumsint[key] /= internships.length;
      });
      console.log(sumsint);
      res.render("adminViews/analysis/internship", {
        avgsint: sumsint,
        noents: false,
      });
    })
    .catch((err) => {
      res.render("error", { error: err, message: err.message });
    });
});

router.post("/industrial", (req, res, next) => {
  Industrial.find({
    acadyear: req.body.acadyear,
    place: req.body.place,
    date: req.body.date,
    department: req.body.department,
  })
    .exec()
    .then((industrials) => {
      if (industrials.length < 1) {
        return res.render("adminViews/analysis/industrial", {
          avgsind: {},
          noents: true,
        });
      }
      var sumsind = {
        outcomes: 0,
        content: 0,
        knowledge: 0,
        duration: 0,
      };

      industrials.forEach((element) => {
        sumsind.outcomes += parseInt(element.outcomes);
        sumsind.content += parseInt(element.content);
        sumsind.knowledge += parseInt(element.knowledge);
        sumsind.duration += parseInt(element.duration);
      });
      console.log(sumsind);

      Object.keys(sumsind).map(function (key, index) {
        sumsind[key] /= industrials.length;
      });
      console.log(sumsind);
      res.render("adminViews/analysis/industrial", {
        avgsind: sumsind,
        noents: false,
      });
    })
    .catch((err) => {
      res.render("error", { error: err, message: err.message });
    });
});

router.post("/seminar", checkLogin, (req, res, next) => {
  Seminar.find({
    acadyear: req.body.acadyear,
    place: req.body.place,
    date: req.body.date,
    department: req.body.department,
    topic: req.body.topicname,
  })
    .exec()
    .then((seminar) => {
      if (seminar.length < 1) {
        return res.render("adminViews/analysis/seminar", {
          avgssem: {},
          noents: true,
        });
      }
      var sumssem = {
        outcomes: 0,
        content: 0,
        session: 0,
        duration: 0,
      };
      seminar.forEach((element) => {
        sumssem.outcomes += parseInt(element.outcomes);
        sumssem.content += parseInt(element.content);
        sumssem.session += parseInt(element.session);
        sumssem.duration += parseInt(element.duration);
      });
      console.log(sumssem);

      Object.keys(sumssem).map(function (key, index) {
        sumssem[key] /= seminar.length;
      });
      console.log(sumssem);
      res.render("adminViews/analysis/seminar", {
        avgssem: sumssem,
        noents: false,
      });
    })
    .catch((err) => {
      res.render("error", { error: err, message: err.message });
    });
});

router.post("/alumni", checkLogin, (req, res, next) => {
  Alumni.find({
    yearpassing: req.body.acadyear,
    department: req.body.department,
  })
    .exec()
    .then((alumnis) => {
      if (alumnis.length < 1) {
        return res.render("adminViews/analysis/alumni", {
          avgsal: {},
          noents: true,
        });
      }
      var freq1 = 0;
      var freq2 = 0;
      var sumsal = {
        proud: 0,
        activities: 0,
        contribute: 0,
        grievance: 0,
        equipments: 0,
        relevant: 0,
        technical: 0,
        placement: 0,
        association: 0,
        updates: 0,
        rate: 0,
        hospitality: 0,
      };

      alumnis.forEach((element) => {
        sumsal.proud += parseInt(element.proud);
        sumsal.activities += parseInt(element.activities);
        sumsal.contribute += parseInt(element.contribute);
        sumsal.grievance += parseInt(element.grievance);
        sumsal.equipments += parseInt(element.equipments);
        sumsal.relevant += parseInt(element.relevant);
        sumsal.technical += parseInt(element.technical);
        sumsal.placement += parseInt(element.placement);
        sumsal.association += parseInt(element.association);
        sumsal.updates += parseInt(element.updates);
        sumsal.rate += parseInt(element.rate);
        sumsal.hospitality += parseInt(element.hospitality);

        if (parseInt(element.frequently) == 1) {
          freq1 += 1;
        } else if (parseInt(element.frequently) == 2) {
          freq2 += 1;
        }
      });
      console.log(alumnis.length);
      console.log(freq1);
      console.log(freq2);
      freq1 = parseFloat((freq1 / alumnis.length) * 100).toFixed(2);
      freq2 = parseFloat((freq2 / alumnis.length) * 100).toFixed(2);
      Object.keys(sumsal).map(function (key, index) {
        sumsal[key] /= alumnis.length;
        sumsal[key] = parseFloat(sumsal[key]).toFixed(2);
      });
      res.render("adminViews/analysis/alumni", {
        avgsal: sumsal,
        freq1: freq1,
        freq2: freq2,
        noents: false,
      });
    })
    .catch((err) => {
      res.render("error", { error: err, message: err.message });
    });
});

router.post("/exit", (req, res, next) => {
  console.log(req.body.department);
  Exit.find({
    yearpassing: req.body.yearpassing,
    department: req.body.department,
  })
    .exec()
    .then((exits) => {
      if (exits.length < 1) {
        return res.render("adminViews/analysis/exit", {
          avgsex: {},
          noents: true,
        });
      }
      var sumsex = {
        prepared: 0, //i
        confidence: 0,
        competencies: 0,
        hod: 0, //iii
        faculty: 0,
        nonteaching: 0,
        library: 0,
        laboratories: 0,
        administration: 0,
        tpo: 0,
        placement: 0,
        discipline: 0,
        environment: 0,
        canteen: 0,
        water: 0,
        internet: 0,
        cleanliness: 0,
        resolution: 0,
      };

      console.log(exits.length);
      exits.forEach((element) => {
        sumsex.prepared += parseInt(element.prepared);
        sumsex.confidence += parseInt(element.confidence);
        sumsex.competencies += parseInt(element.competencies);
        sumsex.hod += parseInt(element.hod);
        sumsex.faculty += parseInt(element.faculty);
        sumsex.nonteaching += parseInt(element.nonteaching);
        sumsex.library += parseInt(element.library);
        sumsex.laboratories += parseInt(element.laboratories);
        sumsex.administration += parseInt(element.administration);
        sumsex.tpo += parseInt(element.tpo);
        sumsex.placement += parseInt(element.placement);
        sumsex.discipline += parseInt(element.discipline);
        sumsex.environment += parseInt(element.environment);
        sumsex.canteen += parseInt(element.canteen);
        sumsex.water += parseInt(element.water);
        sumsex.internet += parseInt(element.internet);
        sumsex.cleanliness += parseInt(element.cleanliness);
        sumsex.resolution += parseInt(element.resolution);
      });
      console.log(sumsex);

      Object.keys(sumsex).map(function (key, index) {
        sumsex[key] /= exits.length;
      });
      res.render("adminViews/analysis/exit", {
        avgsex: sumsex,
        noents: false,
      });
    })
    .catch((err) => {
      res.render("error", { error: err, message: err.message });
    });
});
module.exports = router;
