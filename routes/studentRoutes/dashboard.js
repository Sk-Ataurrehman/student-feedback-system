var express = require("express");
var router = express.Router();

var checkStudent = require("../../middlewares/check-student-login");

router.get("/", checkStudent, (req, res, next) => {
  if (req.session.sloggedIn && req.session.semail) {
    res.render("studentViews/dashboard");
  } else {
    res.render("error", { error: err, message: err.message });
  }
});

module.exports = router;
