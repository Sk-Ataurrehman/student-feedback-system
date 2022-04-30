var express = require("express");
var router = express.Router();

const Course = require("../../models/feedbacks/course");
const Internship = require("../../models/feedbacks/internship");
const Industrial = require("../../models/feedbacks/industrial");
const Seminar = require("../../models/feedbacks/seminar");
const Alumni = require("../../models/feedbacks/alumni");
const Exit = require("../../models/feedbacks/exit");
const Parent = require("../../models/feedbacks/parent");

const checkLogin = require("../../middlewares/check-login");

router.get("/course", checkLogin, async (req, res, next) => {
  var date = new Date().getFullYear();
  var date2 = date.toString() + "-" + (date + 1).toString().substring(2, 4);
  var date1 = (date - 1).toString() + "-" + date.toString().substring(2, 4);

  var staffs = await Course.find().distinct("staff").exec();
  console.log(staffs);
  var compare = {};

  for (const element of staffs) {
    var avgsComp = await Course.find({ staff: element }).exec();

    var sumsComp = {
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

    avgsComp.forEach((el2) => {
      sumsComp.accessibility += parseInt(el2.accessibility);
      sumsComp.punc += parseInt(el2.punctuality);
      sumsComp.sincerity += parseInt(el2.sincerity);
      sumsComp.behaviour += parseInt(el2.behaviour);
      sumsComp.knowledge += parseInt(el2.knowledge);
      sumsComp.engagement += parseInt(el2.engagement);
      sumsComp.presentation += parseInt(el2.presentation);
      sumsComp.interaction += parseInt(el2.interaction);
      sumsComp.aids += parseInt(el2.aids);
      sumsComp.completion += parseInt(el2.completion);
      sumsComp.practices += parseInt(el2.practices);
      sumsComp.evolution += parseInt(el2.evolution);
      sumsComp.ability += parseInt(el2.ability);
      sumsComp.overall += parseInt(el2.overall);
    });

    sumsComp.punc = sumsComp.punc / avgsComp.length;
    sumsComp.accessibility = sumsComp.accessibility / avgsComp.length;
    sumsComp.sincerity = sumsComp.sincerity / avgsComp.length;
    sumsComp.behaviour = sumsComp.behaviour / avgsComp.length;
    sumsComp.knowledge = sumsComp.knowledge / avgsComp.length;
    sumsComp.engagement = sumsComp.engagement / avgsComp.length;
    sumsComp.presentation = sumsComp.presentation / avgsComp.length;
    sumsComp.interaction = sumsComp.interaction / avgsComp.length;
    sumsComp.aids = sumsComp.aids / avgsComp.length;
    sumsComp.completion = sumsComp.completion / avgsComp.length;
    sumsComp.practices = sumsComp.practices / avgsComp.length;
    sumsComp.evolution = sumsComp.evolution / avgsComp.length;
    sumsComp.ability = sumsComp.ability / avgsComp.length;
    sumsComp.overall = sumsComp.overall / avgsComp.length;

    var avgcomp =
      sumsComp.punc +
      sumsComp.accessibility +
      sumsComp.sincerity +
      sumsComp.behaviour +
      sumsComp.knowledge +
      sumsComp.engagement +
      sumsComp.presentation +
      sumsComp.interaction +
      sumsComp.aids +
      sumsComp.completion +
      sumsComp.practices +
      sumsComp.evolution +
      sumsComp.ability +
      sumsComp.overall;
    compare[element] = parseFloat(avgcomp / 14).toFixed(2);
  }

  compareStats = Object.values(compare);
  console.log(compareStats);

  res.render("adminViews/analysis/course", {
    avgs: {},
    noents: false,
    staffs: staffs,
    compareStats: compareStats,
    dates: [date1, date2],
  });
});

router.get("/internship", checkLogin, (req, res, next) => {
  var date = new Date().getFullYear();
  var date2 = date.toString() + "-" + (date + 1).toString().substring(2, 4);
  var date1 = (date - 1).toString() + "-" + date.toString().substring(2, 4);
  res.render("adminViews/analysis/internship", {
    avgsint: {},
    noents: false,
    dates: [date1, date2],
  });
});

router.get("/industrial", checkLogin, (req, res, next) => {
  var date = new Date().getFullYear();
  var date2 = date.toString() + "-" + (date + 1).toString().substring(2, 4);
  var date1 = (date - 1).toString() + "-" + date.toString().substring(2, 4);
  res.render("adminViews/analysis/industrial", {
    avgsind: {},
    noents: false,
    dates: [date1, date2],
  });
});

router.get("/seminar", checkLogin, (req, res, next) => {
  var date = new Date().getFullYear();
  var date2 = date.toString() + "-" + (date + 1).toString().substring(2, 4);
  var date1 = (date - 1).toString() + "-" + date.toString().substring(2, 4);
  res.render("adminViews/analysis/seminar", {
    avgssem: {},
    noents: false,
    dates: [date1, date2],
  });
});

router.get("/alumni", checkLogin, (req, res, next) => {
  res.render("adminViews/analysis/alumni", { avgsal: {}, noents: false });
});

router.get("/exit", checkLogin, (req, res, next) => {
  res.render("adminViews/analysis/exit", { avgsex: {}, noents: false });
});

router.get("/parent", checkLogin, (req, res, next) => {
  var date = new Date().getFullYear();
  var date2 = date.toString() + "-" + (date + 1).toString().substring(2, 4);
  var date1 = (date - 1).toString() + "-" + date.toString().substring(2, 4);
  res.render("adminViews/analysis/parent", {
    avgspa: {},
    noents: false,
    dates: [date1, date2],
  });
});

router.post("/course", async (req, res, next) => {
  var date = new Date().getFullYear();
  var date2 = date.toString() + "-" + (date + 1).toString().substring(2, 4);
  var date1 = (date - 1).toString() + "-" + date.toString().substring(2, 4);

  var courses = await Course.find({
    acadyear: req.body.acadyear,
    department: req.body.department,
    staff: { $regex: new RegExp(req.body.staff, "i") },
  }).exec();

  var staffs = await Course.find().distinct("staff").exec();
  console.log(staffs);
  var compare = {};

  for (const element of staffs) {
    var avgsComp = await Course.find({ staff: element }).exec();

    var sumsComp = {
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

    avgsComp.forEach((el2) => {
      sumsComp.accessibility += parseInt(el2.accessibility);
      sumsComp.punc += parseInt(el2.punctuality);
      sumsComp.sincerity += parseInt(el2.sincerity);
      sumsComp.behaviour += parseInt(el2.behaviour);
      sumsComp.knowledge += parseInt(el2.knowledge);
      sumsComp.engagement += parseInt(el2.engagement);
      sumsComp.presentation += parseInt(el2.presentation);
      sumsComp.interaction += parseInt(el2.interaction);
      sumsComp.aids += parseInt(el2.aids);
      sumsComp.completion += parseInt(el2.completion);
      sumsComp.practices += parseInt(el2.practices);
      sumsComp.evolution += parseInt(el2.evolution);
      sumsComp.ability += parseInt(el2.ability);
      sumsComp.overall += parseInt(el2.overall);
    });

    sumsComp.punc = sumsComp.punc / avgsComp.length;
    sumsComp.accessibility = sumsComp.accessibility / avgsComp.length;
    sumsComp.sincerity = sumsComp.sincerity / avgsComp.length;
    sumsComp.behaviour = sumsComp.behaviour / avgsComp.length;
    sumsComp.knowledge = sumsComp.knowledge / avgsComp.length;
    sumsComp.engagement = sumsComp.engagement / avgsComp.length;
    sumsComp.presentation = sumsComp.presentation / avgsComp.length;
    sumsComp.interaction = sumsComp.interaction / avgsComp.length;
    sumsComp.aids = sumsComp.aids / avgsComp.length;
    sumsComp.completion = sumsComp.completion / avgsComp.length;
    sumsComp.practices = sumsComp.practices / avgsComp.length;
    sumsComp.evolution = sumsComp.evolution / avgsComp.length;
    sumsComp.ability = sumsComp.ability / avgsComp.length;
    sumsComp.overall = sumsComp.overall / avgsComp.length;

    var avgcomp =
      sumsComp.punc +
      sumsComp.accessibility +
      sumsComp.sincerity +
      sumsComp.behaviour +
      sumsComp.knowledge +
      sumsComp.engagement +
      sumsComp.presentation +
      sumsComp.interaction +
      sumsComp.aids +
      sumsComp.completion +
      sumsComp.practices +
      sumsComp.evolution +
      sumsComp.ability +
      sumsComp.overall;
    compare[element] = parseFloat(avgcomp / 14).toFixed(2);
  }

  compareStats = Object.values(compare);
  console.log(compareStats);

  try {
    if (courses.length < 1) {
      return res.render("adminViews/analysis/course", {
        avgs: {},
        noents: true,
        staffs: staffs,
        compareStats: compareStats,
        dates: [date1, date2],
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
    var freq = {
      displayed: { yes: 0, no: 0 }, //form2
      test: { yes: 0, no: 0 },
      marks: { yes: 0, no: 0 },
      curriculum: { yes: 0, no: 0 },
      assessed: { yes: 0, no: 0 },
      classtest: { yes: 0, no: 0 },
    };

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

      if (element.displayed == "Yes") freq.displayed.yes += 1;
      else if (element.displayed == "No") freq.displayed.no += 1;

      if (element.test == "Yes") freq.test.yes += 1;
      else if (element.test == "No") freq.test.no += 1;

      if (element.marks == "Yes") freq.marks.yes += 1;
      else if (element.marks == "No") freq.marks.no += 1;

      if (element.curriculum == "Yes") freq.curriculum.yes += 1;
      else if (element.curriculum == "No") freq.curriculum.no += 1;

      if (element.assessed == "Yes") freq.assessed.yes += 1;
      else if (element.assessed == "No") freq.assessed.no += 1;

      if (element.classtest == "Yes") freq.classtest.yes += 1;
      else if (element.classtest == "No") freq.classtest.no += 1;
    });

    Object.keys(sums).map(function (key, index) {
      sums[key] = parseFloat(sums[key] / courses.length).toFixed(2);
    });

    res.render("adminViews/analysis/course", {
      avgs: sums,
      noents: false,
      freq: freq,
      dates: [date1, date2],
      staffs: staffs,
      compareStats: compareStats,
    });
  } catch (err) {
    res.render("error", { error: err, message: err.message });
  }
});

router.post("/internship", checkLogin, (req, res, next) => {
  var date = new Date().getFullYear();
  var date2 = date.toString() + "-" + (date + 1).toString().substring(2, 4);
  var date1 = (date - 1).toString() + "-" + date.toString().substring(2, 4);

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
          dates: [date1, date2],
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
        dates: [date1, date2],
      });
    })
    .catch((err) => {
      res.render("error", { error: err, message: err.message });
    });
});

router.post("/industrial", (req, res, next) => {
  var date = new Date().getFullYear();
  var date2 = date.toString() + "-" + (date + 1).toString().substring(2, 4);
  var date1 = (date - 1).toString() + "-" + date.toString().substring(2, 4);

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
          dates: [date1, date2],
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
        dates: [date1, date2],
      });
    })
    .catch((err) => {
      res.render("error", { error: err, message: err.message });
    });
});

router.post("/seminar", checkLogin, (req, res, next) => {
  var date = new Date().getFullYear();
  var date2 = date.toString() + "-" + (date + 1).toString().substring(2, 4);
  var date1 = (date - 1).toString() + "-" + date.toString().substring(2, 4);

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
          dates: [date1, date2],
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
        dates: [date1, date2],
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

router.post("/parent", checkLogin, (req, res, next) => {
  var date = new Date().getFullYear();
  var date2 = date.toString() + "-" + (date + 1).toString().substring(2, 4);
  var date1 = (date - 1).toString() + "-" + date.toString().substring(2, 4);

  Parent.find({
    acadyear: req.body.acadyear,
  })
    .exec()
    .then((parents) => {
      if (parents.length < 1) {
        return res.render("adminViews/analysis/parent", {
          avgspa: {},
          noents: true,
          dates: [date1, date2],
        });
      }
      var sumspa = {
        admission: 0,
        infrastructure: 0,
        library: 0,
        canteen: 0,
        sports: 0,
        counseling: 0,
        ict: 0,
        discipline: 0,
        improvements: 0,
        adopted: 0,
        evaluation: 0,
        placements: 0,
      };

      console.log(parents.length);
      parents.forEach((element) => {
        sumspa.admission += parseInt(element.admission);
        sumspa.infrastructure += parseInt(element.infrastructure);
        sumspa.library += parseInt(element.library);
        sumspa.canteen += parseInt(element.canteen);
        sumspa.sports += parseInt(element.sports);
        sumspa.counseling += parseInt(element.counseling);
        sumspa.ict += parseInt(element.ict);
        sumspa.discipline += parseInt(element.discipline);
        sumspa.improvements += parseInt(element.improvements);
        sumspa.adopted += parseInt(element.adopted);
        sumspa.evaluation += parseInt(element.evaluation);
        sumspa.placements += parseInt(element.placements);
      });
      console.log(sumspa);

      Object.keys(sumspa).map(function (key, index) {
        sumspa[key] /= parents.length;
      });
      console.log(sumspa);
      res.render("adminViews/analysis/parent", {
        avgspa: sumspa,
        noents: false,
        dates: [date1, date2],
      });
    })
    .catch((err) => {
      res.render("error", { error: err, message: err.message });
    });
});

module.exports = router;
