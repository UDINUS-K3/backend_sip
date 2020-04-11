const scope = async (req, res, next) => {
    // if (_.has(req.user, 'user_data.is_admin') && req.user.user_data.is_admin === true) return next();

    // req.query.user_id = req.user.user_data.id

    return next();
}

module.exports = scope;