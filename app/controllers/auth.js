const flaverr = require("flaverr");
const models = require("../models");
const encryption = require("../services/encryption");
const jwt = require("jsonwebtoken");
const cloudinary = require("../services/cloudinary");
const fs = require("file-system");
const { use } = require("passport");
const sendEmail = require("../services/send-email").sendEmail;
const generate = require("../services/generate-code").generate;
const signup = async (req, res, next) => {
  try {
    let image_url;

    if (req.file) {
      const uploader = async (path) => await cloudinary.uploads(path, "images");
      const file = req.file;
      const { path } = file;
      let image = await uploader(path);
      image_url = image.url;
      fs.unlinkSync(path);
    }

    console.log(image_url)

    const activation_code = generate(8);

    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: encryption.encrypt(req.body.password).data,
      gender: req.body.gender,
      image: image_url,
      activation_code: activation_code,
      birthday: req.body.birthday,
    };

    const exist = await models.User.restore({
      where: {
          email: req.body.email
      }
    })

    let userData

    if (exist) {
      let currUser = await models.User.findOne({
        where: {email: req.body.email}
      })        

      currUser.firstname = user.firstname
        currUser.lastname = user.lastname
        currUser.username = user.username
        currUser.email = user.email
        currUser.password = user.password
        currUser.image = image_url
        currUser.gender = user.gender
        currUser.activation_code = activation_code
        currUser.is_active = false
        currUser.birthday = user.birthday

        userData = await currUser.save()
    } else {
      userData = await models.User.create(user);
    }

    if (userData) {
      await sendEmail({
        to: req.body.email,
        subject: "email verification",
        text: "Your Activation Code: " + activation_code,
      });
    }

    const data = {
      user_data: userData,
    };

    let token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "2d" });
    token = encryption.encrypt(token).data;

    return res.status(200).json({
      status: "success",
      access_token: token,
      user: userData
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

const signin = async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user)
      throw flaverr(
        "E_NOT_FOUND",
        Error(`user with username ${req.body.username} is does not exits`)
      );

    let success = encryption.decrypt(user.password).data === req.body.password;
    if (!success) throw flaverr("E_NOT_FOUND", Error(`wrong password`));

    const data = {
      user_data: user,
    };

    let token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
    token = encryption.encrypt(token).data;

    return res.status(200).json({
      status: "success",
      access_token: token,
      user: user
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

const changePassword = async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: {
        id: req.user.user_data.id,
      },
    });

    if (!user)
      throw flaverr(
        "E_NOT_FOUND",
        Error(
          `user with username ${req.user.user_data.username} is does not exits`
        )
      );

    if (req.body.new_password === encryption.decrypt(user.password).data) {
      throw flaverr("E_NOT_FOUND", Error(`your password is same!`));
    }

    user.last_password = user.password;
    user.password = encryption.encrypt(req.body.new_password).data;

    await user.save();

    return res.status(200).json({
      status: "success",
      access_token: "password changed",
      user: user
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

const setAdmin = async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: {
        id: req.user.user_data.id,
      },
    });

    if (!user)
      throw flaverr(
        "E_NOT_FOUND",
        Error(
          `user with username ${req.user.user_data.username} is does not exits`
        )
      );

    user.is_admin = true;

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "congratulation, you are admin now",
      user: user
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

const activation = async (req, res, next) => {
  try {
    console.log(req.user.user_data.activation_code)

    const user = await models.User.findOne({
      where: {
        id: req.user.user_data.id
      },
    });

    const activation_code = req.body.activation_code;

    if (!user)
      throw flaverr(
        "E_NOT_FOUND",
        Error(
          `user with username ${req.user.user_data.username} is does not exits`
        )
      );

    if (activation_code !== req.user.user_data.activation_code) {
      throw flaverr(
        "E_NOT_FOUND",
        Error(`activation failed, please check the activation code`)
      );
    }

    user.is_active = true;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "your account has ben activated"
    });
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  signin,
  signup,
  changePassword,
  setAdmin,
  activation,
};
