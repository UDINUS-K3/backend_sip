const flaverr = require('flaverr');
const models = require('../models');
const encryption = require('../services/encryption');
const jwt = require('jsonwebtoken');
const signup = async (req, res, next) => {
    try {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: encryption.encrypt(req.body.password).data,
            gender: req.body.gender,
            // image: req.body.image,
            birthday: req.body.birthday
        }

        const save = await models.User.create(user);

        return res.status(200).json({
            status: 'success',
            data: save
        });
    } catch (err) {
        return res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}

const signin = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!user) throw flaverr('E_NOT_FOUND', Error(`user with username ${req.body.username} is does not exits`));

        let success = (encryption.decrypt(user.password).data === req.body.password);
        if (!success) throw flaverr('E_NOT_FOUND', Error(`wrong password`));

        const data = {
            user_data: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                gender: user.gender,
                image: user.image,
                is_admin: user.is_admin,
                is_active: user.is_active
            }
        }

        let token = jwt.sign(data, process.env.JWT_SECRET);
        token = encryption.encrypt(token).data

        return res.status(200).json({
            status: 'success',
            access_token: token
        });
    } catch (err) {
        return res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}

const changePassword = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: {
                id: req.user.user_data.id
            }
        });

        if (!user) throw flaverr('E_NOT_FOUND', Error(`user with username ${req.user.user_data.username} is does not exits`));

        if (req.body.new_password === encryption.decrypt(user.password).data) {
            throw flaverr('E_NOT_FOUND', Error(`your password is same!`));
        }

        user.last_password = user.password;
        user.password = encryption.encrypt(req.body.new_password).data;

        await user.save();

        return res.status(200).json({
            status: 'success',
            access_token: 'password changed'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}

const setAdmin = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: {
                id: req.user.user_data.id
            }
        });

        if (!user) throw flaverr('E_NOT_FOUND', Error(`user with username ${req.user.user_data.username} is does not exits`));

        user.is_admin = true;

        await user.save();

        return res.status(200).json({
            status: 'success',
            access_token: 'congratulation, you are admin now'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}

module.exports = {
    signin,
    signup,
    changePassword,
    setAdmin
}