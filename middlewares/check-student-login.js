module.exports = (req, res, next) => {
  if (req.session.sloggedIn && req.session.semail) {
    next();
  } else {
    res.render("err500");
  }
};
