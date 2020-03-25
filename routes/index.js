const category = require('./category');
const information = require('./information');

module.exports = (app) => {
    app.get('/', function (req, res, next) {
        return res.status(200).json({
            message: "hello dev!"
        });
    });

    app.use('/categories', category);
    app.use('/informations', information);
}