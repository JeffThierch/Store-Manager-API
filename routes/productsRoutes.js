const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router
  .get('/', productsController.getAll)
  .post('/', productsController.createProduct)
  .get('/:id', productsController.getById);

module.exports = router;
