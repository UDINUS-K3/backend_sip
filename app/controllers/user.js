const flaverr = require('flaverr');
const models = require('../models');
const encryption = require('../services/encryption');
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

const update = async (req, res, next) => {
    try {
        const data = await models.User.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!data) throw flaverr('E_NOT_FOUND', Error(`user not found by id ${req.params.id}`));

        if (req.body.firstname) data.firstname = req.body.firstname;
        if (req.body.lastname) data.lastname = req.body.lastname;
        if (req.body.username) data.username = req.body.username;
        if (req.body.email) data.email = req.body.email;
        if (req.body.gender) data.gender = req.body.gender;
        if (req.body.birthday) data.birthday = req.body.birthday;

        const update = await data.save();

        return res.status(200).json({
            status: 'success',
            data: update
        });
    } catch (err) {
        return res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}

const destroy = async (req, res, next) => {
    try {
        const data = await models.User.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!data) throw flaverr('E_NOT_FOUND', Error(`user not found by id ${req.params.id}`));

        const destroy = await data.destroy();

        return res.status(200).json({
            status: 'success',
            data: destroy
        });
    } catch (err) {
        return res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}

const findById = async (req, res, next) => {
    try {
        const data = await models.User.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!data) throw flaverr('E_NOT_FOUND', Error(`user not found by id ${req.params.id}`));

        return res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (err) {
        return res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}

const findAll = async (req, res, next) => {
    try {
        const rows = await models.User.findAll();

        if (rows.length === 0) throw flaverr('E_NOT_FOUND', Error(`users not found`));

        return res.status(200).json({
            status: 'success',
            data: rows
        });
    } catch (err) {
        return res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}

module.exports = {
    save,
    update,
    destroy,
    findById,
    findAll
}