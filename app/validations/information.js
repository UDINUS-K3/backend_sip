const { body, param, checkIf } = require("express-validator");

const save = () => {
  return [
    body("name").exists().not().isEmpty().isString().escape(),
    body("description").optional().not().isEmpty().escape(),
    body("min_age").exists().isNumeric(),
  ];
};

const update = () => {
  return [
    param("id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid information id"),
    body("name").optional().isString().escape(),
    body("description").optional().not().isEmpty().escape(),
    body("min_age").optional().isNumeric(),
  ];
};

const destroy = () => {
  return [
    param("id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid information id"),
  ];
};

const findById = () => {
  return [
    param("id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid information id"),
  ];
};

const findByAll = () => {
  return [
    param("name").optional().isString().escape(),
    param("min_age").optional().isNumeric().toFloat(),
    param("page").optional().isNumeric().toInt(),
    param("per_page").optional().isNumeric().toInt(),
    param("user_id").optional().escape(),
  ];
};

const addCategory = () => {
  return [
    body("information_id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid information id"),
    body("categories.*.id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid category id"),
  ];
};

const removeCategory = () => {
  return [
    body("information_id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid information id"),
    body("categories.*.id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid category id"),
  ];
};

module.exports = {
  save,
  update,
  destroy,
  findById,
  findByAll,
  addCategory,
  removeCategory,
};
