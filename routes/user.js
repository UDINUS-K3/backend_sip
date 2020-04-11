const express = require('express');
const router = express.Router();
const user = require('../app/controllers/user');

router.post('/', user.save);
router.patch('/:id', user.update);
router.delete('/:id', user.destroy);
router.get('/:id', user.findById);
router.get('/', user.findAll);

module.exports = router;