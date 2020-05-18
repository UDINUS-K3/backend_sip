const flaverr = require("flaverr");
const models = require("../models");
const encryption = require("../services/encryption");
const save = async (req, res, next) => {
  try {
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: encryption.encrypt(req.body.password).data,
      gender: req.body.gender,
      // image: req.body.image,
      birthday: req.body.birthday,
    };

    const save = await models.User.create(user);

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
    const data = await models.User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!data)
      throw flaverr(
        "E_NOT_FOUND",
        Error(`user not found by id ${req.params.id}`)
      );

    if (req.body.firstname) data.firstname = req.body.firstname;
    if (req.body.lastname) data.lastname = req.body.lastname;
    if (req.body.username) data.username = req.body.username;
    if (req.body.email) data.email = req.body.email;
    if (req.body.gender) data.gender = req.body.gender;
    if (req.body.birthday) data.birthday = req.body.birthday;

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
    const data = await models.User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!data)
      throw flaverr(
        "E_NOT_FOUND",
        Error(`user not found by id ${req.params.id}`)
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
    const data = await models.User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!data)
      throw flaverr(
        "E_NOT_FOUND",
        Error(`user not found by id ${req.params.id}`)
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
    if (req.query.username)
      where.username = { [Op.iLike]: `%${req.query.username}%` };
    if (req.query.firstname)
      where.firstname = { [Op.iLike]: `%${req.query.firstname}%` };
    if (req.query.lastname)
      where.lastname = { [Op.iLike]: `%${req.query.lastname}%` };
    if (req.query.email) where.email = { [Op.iLike]: `%${req.query.email}%` };
    if (req.query.gender)
      where.gender = { [Op.iLike]: `%${req.query.gender}%` };

    const { count, rows } = await models.User.findAndCountAll({
      offset: (req.query.page - 1) * req.query.per_page,
      limit: req.query.per_page,
      where: where,
      include: [
        {
          model: models.Information,
        },
        {
          model: models.Comment,
        },
      ],
    });

    if (count === 0) throw flaverr("E_NOT_FOUND", Error(`user not found`));

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
