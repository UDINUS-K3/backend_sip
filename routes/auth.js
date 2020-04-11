const passport = require('passport');
const scope = require('../app/middlewares/scope');
const decryptToken = require('../app/middlewares/decrypt-token');
const express = require('express');
const router = express.Router();
const auth = require('../app/controllers/auth');

router.post('/signup', auth.signup);
router.post('/signin', auth.signin);
router.put('/change_password', decryptToken, passport.authenticate('jwt', { session: false }), scope, auth.changePassword);
router.put('/set_admin', decryptToken, passport.authenticate('jwt', { session: false }), scope, auth.setAdmin);

module.exports = router;