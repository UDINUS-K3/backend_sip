const flaverr = require("flaverr");
const models = require("../models");
const save = async (req, res, next) => {
  try {
    const category = {
      name: req.body.name,
    };

    const save = await models.Category.create(category);

    return res.status(200).json({
      status: "success",
      data: save,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

const update = async (req, res, next) => {
  try {
    const data = await models.Category.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!data)
      throw flaverr(
        "E_NOT_FOUND",
        Error(`category not found by id ${req.params.id}`)
      );

    if (req.body.name) data.name = req.body.name;

    const update = await data.save();

    return res.status(200).json({
      status: "success",
      data: update,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

const destroy = async (req, res, next) => {
  try {
    const data = await models.Category.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!data)
      throw flaverr(
        "E_NOT_FOUND",
        Error(`category not found by id ${req.params.id}`)
      );

    const destroy = await data.destroy();

    return res.status(200).json({
      status: "success",
      data: destroy,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

const findById = async (req, res, next) => {
  try {
    const data = await models.Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: models.Information,
          as: "category_informations",
        },
      ],
    });

    if (!data)
      throw flaverr(
        "E_NOT_FOUND",
        Error(`category not found by id ${req.params.id}`)
      );

    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

const findAll = async (req, res, next) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.per_page = req.query.per_page ? req.query.per_page : 50;
    const where = {};
    if (req.query.name) where.name = { [Op.iLike]: `%${req.query.name}%` };

    const { count, rows } = await models.Category.findAndCountAll({
      offset: (req.query.page - 1) * req.query.per_page,
      limit: req.query.per_page,
      where: where,
    });

    if (count === 0) throw flaverr("E_NOT_FOUND", Error(`category not found`));

    const result = paginate({
      data: rows,
      count: count,
      page: req.query.page,
      per_page: req.query.per_page,
    });

    return res.status(200).json({
      status: "success",
      result,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  save,
  update,
  destroy,
  findById,
  findAll,
};
