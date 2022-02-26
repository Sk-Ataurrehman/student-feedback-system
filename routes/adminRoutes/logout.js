var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  req.session.email = null;
  req.session.loggedIn = false;
  res.redirect("/admin-feedback/login");
});

module.exports = router;
