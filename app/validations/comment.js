const { body, param, checkIf } = require("express-validator");

const save = () => {
  return [
    body("comment").exists().not().isEmpty().isString().escape(),
    body("information_id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid information id"),
  ];
};

const update = () => {
  return [
    param("id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid comment id"),
    body("comment").optional().isString().escape(),
  ];
};

const destroy = () => {
  return [
    param("id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid comment id"),
  ];
};

const findById = () => {
  return [
    param("id")
      .exists()
      .isUUID(4)
      .withMessage("Please provide a valid comment id"),
  ];
};

const findByAll = () => {
  return [
    param("comment").optional().isString().escape(),
    param("page").optional().isNumeric().toInt(),
    param("per_page").optional().isNumeric().toInt(),
    param("user_id").optional().escape(),
    param("information_id").optional().escape(),
  ];
};

module.exports = {
  save,
  update,
  destroy,
  findById,
  findByAll,
};
