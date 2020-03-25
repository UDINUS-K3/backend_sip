module.exports = (app) => {
    app.get('/', function (req, res, next) {
        return res.status(200).json({
            message: "hello dev!"
        });
    });
}