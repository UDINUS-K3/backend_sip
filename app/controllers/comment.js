const flaverr = require('flaverr');
const models = require('../models');
const save = async (req, res, next) => {
    try {
        const comment = {
            comment: req.body.comment,
            user_id: req.user.user_data.id,
            information_id: req.body.information_id,
        }

        const information = models.Information.findOne({
            where: {
                id: req.body.information_id
            }
        });

        if (!information) throw flaverr('E_NOT_FOUND', Error(`information not found by id ${req.body.information_id}`));

        const save = await models.Comment.create(comment);

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
        const comment = await models.Comment.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: models.Information
            },
            {
                model: models.User
            }]
        });

        if (!comment) throw flaverr('E_NOT_FOUND', Error(`comment not found by id ${req.params.id}`));

        if (req.body.comment) comment.comment = req.body.comment;

        const update = await comment.save();

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
        const comment = await models.Comment.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: models.Information
            },
            {
                model: models.User
            }]
        });

        if (!comment) throw flaverr('E_NOT_FOUND', Error(`comment not found by id ${req.params.id}`));

        const destroy = await comment.destroy();

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
        const comment = await models.Comment.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: models.Information
            },
            {
                model: models.User
            }]
        });

        if (!comment) throw flaverr('E_NOT_FOUND', Error(`comment not found by id ${req.params.id}`));

        return res.status(200).json({
            status: 'success',
            data: comment
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
        const rows = await models.Comment.findAll({
            include: [{
                model: models.Information
            },
            {
                model: models.User
            }]
        });

        if (rows.length === 0) throw flaverr('E_NOT_FOUND', Error(`comment not found`));

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