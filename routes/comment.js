const express = require("express");
const router = express.Router();
const comment = require("../app/controllers/comment");
const validate = require("../app/middlewares/validation");
const validationRules = require("../app/validations/comment");

router.post("/", validationRules.save(), validate, comment.save);
router.patch("/:id", validationRules.update(), validate, comment.update);
router.delete("/:id", validationRules.destroy(), validate, comment.destroy);
router.get("/:id", validationRules.findById(), validate, comment.findById);
router.get("/", validationRules.findByAll(), validate, comment.findAll);

module.exports = router;
