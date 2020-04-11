const encryption = require('../services/encryption');
const models = require('../models');

const decrypt = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(422).json({
            status: 'failed',
            message: 'token authentication is required'
        });
    }

    const cipherText = req.headers.authorization.split(/^Bearer\s+/);

    const decrypted = encryption.decrypt(cipherText[1]);

    if (decrypted.status) {
        req.headers.authorization = `Bearer ${decrypted.data}`;

        return next();
    }

    return res.status(422).json({
        status: 'failed',
        message: 'invalid token'
    });
}

module.exports = decrypt;