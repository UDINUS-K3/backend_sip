const express = require("express");
const router = express.Router();
const category = require("../app/controllers/category");
const validate = require("../app/middlewares/validation");
const validationRules = require("../app/validations/category");

router.post("/", validationRules.save(), validate, category.save);
router.patch("/:id", validationRules.update(), validate, category.update);
router.delete("/:id", validationRules.destroy(), validate, category.destroy);
router.get("/:id", validationRules.findById(), validate, category.findById);
router.get("/", validationRules.findByAll(), validate, category.findAll);

module.exports = router;
