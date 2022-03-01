var express = require("express");
var router = express.Router();

var checkLogin = require("../../middlewares/check-login");

router.get("/", checkLogin, (req, res, next) => {
  if (req.session.loggedIn && req.session.email) {
    res.render("adminViews/dashboard");
  } else {
    res.render("error");
  }
});

module.exports = router;
