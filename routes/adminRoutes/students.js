const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");

const checkLogin = require("../../middlewares/check-login");

const Student = require("../../models/student");

router.get("/", checkLogin, (req, res, next) => {
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

router.get("/add-student", checkLogin, (req, res, next) => {
  res.render("adminViews/students/add-student", { exist: false });
});

router.post("/add-student", checkLogin, (req, res, next) => {
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

router.get("/edit-student", checkLogin, (req, res, next) => {
  res.render("adminViews/students/edit-student", {
    exist: false,
    id: req.query.id,
    rollno: req.query.rollno,
    name: req.query.name,
    email: req.query.email,
    parent_email: req.query.parent_email,
    department: req.query.department,
    address: req.query.address,
  });
});

router.post("/edit-student", checkLogin, (req, res, next) => {
  Student.findById(req.body.studentId)
    .exec()
    .then((student) => {
      console.log(student);
      if (req.body.password) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            return res.render("error");
          } else {
            student.name = req.body.name;
            student.email = req.body.email;
            student.password = hash;
            student.parent_email = req.body.parent_email;
            student.department = req.body.department;
            student.address = req.body.address;
            student
              .save()
              .then((result) => {
                console.log(result);
                res.redirect("/admin-feedback/students");
              })
              .catch((err) => {
                console.log(err);
                res.render("error", { message: err.message, error: err });
              });
          }
        });
      } else {
        student.name = req.body.name;
        student.email = req.body.email;
        student.parent_email = req.body.parent_email;
        student.department = req.body.department;
        student.address = req.body.address;

        student
          .save()
          .then((result) => {
            console.log(result);
            res.redirect("/admin-feedback/students");
          })
          .catch((err) => {
            console.log(err);
            res.render("error");
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.render("error");
    });
});

router.get("/delete-student", (req, res, next) => {
  Student.findByIdAndDelete(req.query.id)
    .exec()
    .then((student) => {
      res.redirect("/admin-feedback/students");
    })
    .catch((err) => {
      console.log(err);
      res.render("error", { error: err, message: err.message });
    });
});

module.exports = router;
