const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router
  .get('/', salesController.getAll)
  .post('/', salesController.createSale)
  .get('/:id', salesController.getById)
  .put('/:id', salesController.updateSale);

module.exports = router;
