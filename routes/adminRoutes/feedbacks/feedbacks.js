var express = require("express");
var router = express.Router();

var checkLogin = require("../../../middlewares/check-login");

router.get("/internship", checkLogin, (req, res, next) => {
  res.render("adminViews/feedbacks/internship");
});

module.exports = router;
