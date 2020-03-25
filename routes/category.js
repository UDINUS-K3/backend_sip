const express = require('express');
const router = express.Router();
const category = require('../app/controllers/category');

router.post('/', category.save);
router.patch('/:id', category.update);
router.delete('/:id', category.destroy);
router.get('/:id', category.findById);
router.get('/', category.findAll);

module.exports = router;