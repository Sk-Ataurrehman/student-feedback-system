var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  req.session.semail = null;
  req.session.sloggedIn = false;
  res.redirect("/student-feedback/login");
});

module.exports = router;
