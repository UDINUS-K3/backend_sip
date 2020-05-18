const { body, param, checkIf } = require("express-validator");

const save = () => {
  return [body("name").exists().not().isEmpty().isString().escape()];
};

const update = () => {
  return [
    param("id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid category id"),
    body("name").optional().isString().escape(),
  ];
};

const destroy = () => {
  return [
    param("id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid category id"),
  ];
};

const findById = () => {
  return [
    param("id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid category id"),
  ];
};

const findByAll = () => {
  return [
    param("name").optional().isString().escape(),
    param("page").optional().isNumeric().toInt(),
    param("per_page").optional().isNumeric().toInt(),
  ];
};

module.exports = {
  save,
  update,
  destroy,
  findById,
  findByAll,
};
