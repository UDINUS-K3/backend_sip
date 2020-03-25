const express = require('express');
const router = express.Router();
const information = require('../app/controllers/information');

router.post('/', information.save);
router.patch('/:id', information.update);
router.delete('/:id', information.destroy);
router.get('/:id', information.findById);
router.get('/', information.findAll);
router.put('/add_category', information.addCategory);
router.put('/remove_category', information.removeCategory);

module.exports = router;