const express = require("express");
const router = express.Router();
const information = require("../app/controllers/information");
const upload = require("../app/middlewares/upload-image").upload;
const validate = require("../app/middlewares/validation");
const validationRules = require("../app/validations/information");

router.post("/", upload, validationRules.save(), validate, information.save);
router.patch("/:id", upload, validationRules.update(), validate, information.update);
router.delete("/:id", validationRules.destroy(), validate, information.destroy);
router.get("/:id", validationRules.findById(), validate, information.findById);
router.get("/", validationRules.findByAll(), validate, information.findAll);
router.put(
  "/add_category",
  validationRules.addCategory(),
  validate,
  information.addCategory
);
router.put(
  "/remove_category",
  validationRules.removeCategory(),
  validate,
  information.removeCategory
);

module.exports = router;
