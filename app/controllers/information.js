const flaverr = require('flaverr');
const models = require('../models');
const cloudinary = require('../services/cloudinary');
const fs = require('file-system');
const save = async (req, res, next) => {
    try {
        let image;

        const uploader = async (path) => await cloudinary.uploads(path, 'images');
        const file = req.file
        console.log(file)

        const { path } = file
        image = await uploader(path)
        console.log(image)

        fs.unlinkSync(path)

        const information = {
            name: req.body.name,
            description: req.body.description,
            image: image.url,
            // location: req.body.location,
            min_age: req.body.min_age,
            user_id: req.user.user_data.id,
        }

        console.log(information)

        const save = await models.Information.create(information);

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
        const data = await models.Information.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: models.Category,
                as: 'category_informations'
            },
            {
                model: models.User
            }]
        });

        if (!data) throw flaverr('E_NOT_FOUND', Error(`information not found by id ${req.params.id}`));

        if (req.body.name) data.name = req.body.name;
        if (req.body.description) data.description = req.body.description;
        if (req.body.min_age) data.min_age = req.body.min_age;

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
        const data = await models.Information.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: models.Category,
                as: 'category_informations'
            },
            {
                model: models.User
            }]
        });

        if (!data) throw flaverr('E_NOT_FOUND', Error(`information not found by id ${req.params.id}`));

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
        const data = await models.Information.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: models.Category,
                as: 'category_informations'
            },
            {
                model: models.User
            }]
        });

        if (!data) throw flaverr('E_NOT_FOUND', Error(`information not found by id ${req.params.id}`));

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
        const rows = await models.Information.findAll({
            include: [{
                model: models.Category,
                as: 'category_informations'
            },
            {
                model: models.User
            }]
        });

        if (rows.length === 0) throw flaverr('E_NOT_FOUND', Error(`information not found`));

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

const addCategory = async (req, res, next) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            console.log('1');
            const information = await models.Information.findOne({
                where: {
                    id: req.body.information_id
                },
                include: [{
                    model: models.Category,
                    as: 'category_informations'
                },
                {
                    model: models.User
                }],
                transaction: t
            });
            console.log('2');
            if (!information) throw flaverr('E_NOT_FOUND', new Error(`information with id ${req.body.information_id} is not exist`));

            let failed = []
            let success = []
            for (let cat of req.body.categories) {
                const category = await models.Category.findOne({
                    where: {
                        id: cat.id
                    },
                    transaction: t
                });

                if (category) {
                    await information.addCategory_information(category, {
                        transaction: t
                    });
                    success.push(cat);
                }
                else {
                    failed.push(cat);
                }
            }

            return {
                success,
                failed
            }
        });

        return res.status(200).json({
            status: 'success',
            data: result
        });
    }
    catch (err) {
        return res
            .status(err.code === 'E_NOT_FOUND' ? 404 : 500)
            .json({
                status: 'failed',
                message: err.message
            });
    }
}

const removeCategory = async (req, res, next) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            console.log('1');
            const information = await models.Information.findOne({
                where: {
                    id: req.body.information_id
                },
                include: [{
                    model: models.Category,
                    as: 'category_informations'
                },
                {
                    model: models.User
                }],
                transaction: t
            });
            console.log('2');
            if (!information) throw flaverr('E_NOT_FOUND', new Error(`information with id ${req.body.information_id} is not exist`));

            let failed = []
            let success = []
            for (let cat of req.body.categories) {
                const category = await models.Category.findOne({
                    where: {
                        id: cat.id
                    },
                    transaction: t
                });

                if (category) {
                    await information.removeCategory_information(category, {
                        transaction: t
                    });
                    success.push(cat);
                }
                else {
                    failed.push(cat);
                }
            }

            return {
                success,
                failed
            }
        });

        return res.status(200).json({
            status: 'success',
            data: result
        });
    }
    catch (err) {
        return res
            .status(err.code === 'E_NOT_FOUND' ? 404 : 500)
            .json({
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
    findAll,
    addCategory,
    removeCategory
}