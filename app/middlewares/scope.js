const scope = async (req, res, next) => {
  // if (_.has(req.user, 'user_data.is_admin') && req.user.user_data.is_admin === true) return next();

  

  if (!req.user.user_data.is_active) {
    return res.status(422).json({
      status: "failed",
      message: "your account is not active",
    });
  }

  return next();
};

module.exports = scope;
