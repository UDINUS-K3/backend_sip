const passport = require("passport");
const scope = require("../app/middlewares/scope");
const decryptToken = require("../app/middlewares/decrypt-token");
const express = require("express");
const router = express.Router();
const auth = require("../app/controllers/auth");
const activation = require("../app/middlewares/activation");
const upload = require("../app/middlewares/upload-image").upload;

router.post("/signup", upload, auth.signup);
router.post("/signin", auth.signin);
router.put(
  "/change_password",
  decryptToken,
  passport.authenticate("jwt", { session: false }),
  scope,
  auth.changePassword
);
router.put(
  "/set_admin",
  decryptToken,
  passport.authenticate("jwt", { session: false }),
  scope,
  auth.setAdmin
);
router.post(
  "/activation",
  decryptToken,
  passport.authenticate("jwt", { session: false }),
  activation,
  auth.activation
);

module.exports = router;
