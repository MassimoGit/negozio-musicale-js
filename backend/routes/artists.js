const express = require('express');
const artistsController = require('../controllers/artistsController');

const router = express.Router();

router.get('/', artistsController.getAll);
router.post('/', artistsController.create);
router.put('/:id', artistsController.update);
router.delete('/:id', artistsController.remove);

module.exports = router;
