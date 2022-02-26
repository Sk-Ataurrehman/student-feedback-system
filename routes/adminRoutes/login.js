var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Admin = require("../../models/admin");
/* GET Login page. */
router.get("/", function (req, res, next) {
  res.render("adminViews/login", { valErr: false });
});

router.post("/", (req, res, next) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then((admin) => {
      if (admin.length < 1) {
        res.render("adminViews/login", { valErr: true });
      } else {
        bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
          if (err) {
            res.render("adminViews/login", { valErr: true });
          }
          if (result) {
            req.session.email = admin[0].email;
            req.session.loggedIn = true;
            res.redirect("/admin-feedback/dashboard");
          } else {
            res.render("adminViews/login", { valErr: true });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.render("error");
    });
});

router.post("/add", (req, res, next) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(200).json({
              error: err,
            });
          } else {
            const admin = new Admin({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            admin
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                res.render("error", { message: err.mesasge, error: err });
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
