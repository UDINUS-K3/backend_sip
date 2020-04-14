const express = require('express');
const router = express.Router();
const information = require('../app/controllers/information');
const upload = require('../app/middlewares/upload-image').upload;

router.post('/', upload, information.save);
router.patch('/:id', information.update);
router.delete('/:id', information.destroy);
router.get('/:id', information.findById);
router.get('/', information.findAll);
router.put('/add_category', information.addCategory);
router.put('/remove_category', information.removeCategory);

module.exports = router;