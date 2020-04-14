const passport = require('passport');
const scope = require('../app/middlewares/scope');
const decryptToken = require('../app/middlewares/decrypt-token');
const category = require('./category');
const information = require('./information');
const comment = require('./comment');
const auth = require('./auth');
const user = require('./user');
const upload = require('../app/middlewares/upload-image').upload;
const cloudinary = require('../app/services/cloudinary');
const fs = require('file-system');

module.exports = (app) => {
    app.get('/', function (req, res, next) {
        return res.status(200).json({
            message: "hello dev!"
        });
    });

    app.post('/upload_images', upload, async (req, res) => {
        try {
            const uploader = async (path) => await cloudinary.uploads(path, 'images');

            const file = req.file
            const { path } = file
            const newPath = await uploader(path)
            fs.unlinkSync(path)

            res.status(200).json({
                message: 'success',
                data: newPath
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'failed',
                error: error.message
            })
        }
    });

    // app routes
    app.use('/auth', auth);
    app.use('/users', decryptToken, passport.authenticate('jwt', { session: false }), scope, user);
    app.use('/categories', decryptToken, passport.authenticate('jwt', { session: false }), scope, category);
    app.use('/informations', decryptToken, passport.authenticate('jwt', { session: false }), scope, information);
    app.use('/comments', decryptToken, passport.authenticate('jwt', { session: false }), scope, comment);
}