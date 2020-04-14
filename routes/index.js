const passport = require('passport');
const scope = require('../app/middlewares/scope');
const decryptToken = require('../app/middlewares/decrypt-token');
const category = require('./category');
const information = require('./information');
const comment = require('./comment');
const auth = require('./auth');
const user = require('./user');
const fetch = require('node-fetch');

module.exports = (app) => {
    app.get('/', function (req, res, next) {
        return res.status(200).json({
            message: "hello dev!"
        });
    });

    // get image
    app.get("/proxy", (req, response) => {
        const url = req.query.url
        if (url && url.length > 0) {
            fetch(url)
                .then(res => res.body.pipe(response))
                .catch(err => console.log(err))
        } else {
            return res.json({ url: url })
        }
    })

    // app routes
    app.use('/auth', auth);
    app.use('/users', decryptToken, passport.authenticate('jwt', { session: false }), scope, user);
    app.use('/categories', decryptToken, passport.authenticate('jwt', { session: false }), scope, category);
    app.use('/informations', decryptToken, passport.authenticate('jwt', { session: false }), scope, information);
    app.use('/comments', decryptToken, passport.authenticate('jwt', { session: false }), scope, comment);
}