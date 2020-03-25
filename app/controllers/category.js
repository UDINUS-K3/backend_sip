const flaverr = require('flaverr');
const models = require('../models');
const save = async (req, res, next) => {
    try {
        const category = {
            name: req.body.category_name
        }

        const save = await models.Category.create(category);

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
        const data = await models.Category.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!data) throw flaverr('E_NOT_FOUND', Error(`category not found by id ${req.params.id}`));

        if (req.body.category_name) data.name = req.body.category_name;

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
        const data = await models.Category.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!data) throw flaverr('E_NOT_FOUND', Error(`category not found by id ${req.params.id}`));

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
        const data = await models.Category.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!data) throw flaverr('E_NOT_FOUND', Error(`category not found by id ${req.params.id}`));

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
        const rows = await models.Category.findAll();

        if (rows.length === 0) throw flaverr('E_NOT_FOUND', Error(`category not found`));

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