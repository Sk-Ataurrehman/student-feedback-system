var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  if (req.session.loggedIn && req.session.email) {
    res.render("adminViews/dashboard");
  } else {
    res.render("error");
  }
});

module.exports = router;
