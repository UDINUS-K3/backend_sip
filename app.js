const express = require("express");
const logger = require("morgan");
const router = require("./routes");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

const app = express();

// parsing setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// models setup
require("./app/models");

// global setup
global.paginate = require("./app/services/pagination").paginate;

// passport setup
require("./app/passports/jsonwebtoken")(passport);

// cors setup
app.use(cors());

// router
router(app);

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
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
