const activation = async (req, res, next) => {
  if (req.user.user_data.is_active) {
    return res.status(422).json({
      status: "failed",
      message: "your account is already activate",
    });
  }

  return next();
};

module.exports = activation;
