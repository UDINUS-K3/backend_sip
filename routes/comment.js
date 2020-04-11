const express = require('express');
const router = express.Router();
const comment = require('../app/controllers/comment');

router.post('/', comment.save);
router.patch('/:id', comment.update);
router.delete('/:id', comment.destroy);
router.get('/:id', comment.findById);
router.get('/', comment.findAll);

module.exports = router;