var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Student = require("../../models/student");
/* GET Login page. */
router.get("/", function (req, res, next) {
  res.render("studentViews/login", { valErr: false });
});

router.post("/", (req, res, next) => {
  Student.find({ email: req.body.email })
    .exec()
    .then((student) => {
      if (student.length < 1) {
        res.render("studentViews/login", { valErr: true });
      } else {
        bcrypt.compare(
          req.body.password,
          student[0].password,
          (err, result) => {
            if (err) {
              res.render("studentViews/login", { valErr: true });
            }
            if (result) {
              req.session.semail = student[0].email;
              req.session.sloggedIn = true;
              res.redirect("/student-feedback/dashboard");
            } else {
              res.render("studentViews/login", { valErr: true });
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
      res.render("error");
    });
});

module.exports = router;
