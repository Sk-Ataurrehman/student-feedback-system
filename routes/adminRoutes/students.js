const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");

const Student = require("../../models/student");

router.get("/", (req, res, next) => {
  Student.find()
    .exec()
    .then((students) => {
      res.render("adminViews/students/students.ejs", { students: students });
    })
    .catch((err) => {
      console.log(err);
      res.render("error", { error: err, message: err.message });
    });
});

router.get("/add-student", (req, res, next) => {
  res.render("adminViews/students/add-student", { exist: false });
});

router.post("/add-student", (req, res, next) => {
  Student.find({ email: req.body.email })
    .exec()
    .then((student) => {
      if (student.length >= 1) {
        return res.render("adminViews/students/add-student", {
          exist: true,
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.render("error", { message: err.message, error: err });
          } else {
            const student = new Student({
              _id: new mongoose.Types.ObjectId(),
              rollno: req.body.rollno,
              name: req.body.name,
              email: req.body.email,
              password: hash,
              parent_email: req.body.parent_email,
              department: req.body.department,
              address: req.body.address,
            });
            console.log(student);
            student
              .save()
              .then((result) => {
                res.redirect("/admin-feedback/students");
              })
              .catch((err) => {
                res.render("error", { error: err, message: err.message });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.render("error", { message: err.message, error: err });
    });
});

module.exports = router;
