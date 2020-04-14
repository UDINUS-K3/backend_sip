const passport = require('passport');
const scope = require('../app/middlewares/scope');
const decryptToken = require('../app/middlewares/decrypt-token');
const category = require('./category');
const information = require('./information');
const comment = require('./comment');
const auth = require('./auth');
const user = require('./user');

module.exports = (app) => {
    app.get('/', function (req, res, next) {
        return res.status(200).json({
            message: "hello dev!"
        });
    });

    // get image
    app.get("/assets/images/:url", (req, res) => {
        const url = req.params.url
        if (url && url.length > 0) {
            fetch(url)
                .then(res => res.body.pipe(res))
                .catch(err => console.log(err))
        }
    })

    // app routes
    app.use('/auth', auth);
    app.use('/users', decryptToken, passport.authenticate('jwt', { session: false }), scope, user);
    app.use('/categories', decryptToken, passport.authenticate('jwt', { session: false }), scope, category);
    app.use('/informations', decryptToken, passport.authenticate('jwt', { session: false }), scope, information);
    app.use('/comments', decryptToken, passport.authenticate('jwt', { session: false }), scope, comment);
}