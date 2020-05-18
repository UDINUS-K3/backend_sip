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
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
