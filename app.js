var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
require("dotenv").config();
const mongoose = require("mongoose");

try {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(process.env.DB, connectionParams);
  console.log("connected to database.");
} catch (error) {
  console.log(error, "could not connect to database.");
}

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

//Admin Routes
const adminLogin = require("./routes/adminRoutes/login");
const adminLogout = require("./routes/adminRoutes/logout");
const adminDashboard = require("./routes/adminRoutes/dashboard");
const studentsRoute = require("./routes/adminRoutes/students");
const analysisRoute = require("./routes/adminRoutes/analysis");

// Students Routes
const studentLogin = require("./routes/studentRoutes/login");
const studentDashboard = require("./routes/studentRoutes/dashboard");
const studentLogout = require("./routes/studentRoutes/logout");
const StudentfeedbackRoutes = require("./routes/studentRoutes/feedback");

var app = express();
var port = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Admin Routes
app.use("/admin-feedback/login", adminLogin);
app.use("/admin-feedback/logout", adminLogout);
app.use("/admin-feedback/dashboard", adminDashboard);
app.use("/admin-feedback/students", studentsRoute);
app.use("/admin-feedback/analysis", analysisRoute);

// Student Routes
app.use("/student-feedback/login", studentLogin);
app.use("/student-feedback/dashboard", studentDashboard);
app.use("/student-feedback/logout", studentLogout);
app.use("/student-feedback/feedbacks", StudentfeedbackRoutes);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render("error", { message: err.message, error: err });
});

app.listen(port, () => {
  console.log("Listening on port: " + port);
});

module.exports = app;
