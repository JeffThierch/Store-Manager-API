const productsModel = require('../models/ProductsModel');
const { orderArrayOfObjectByProperty } = require('./helpers');

const getAll = async () => {
  const products = await productsModel.getAll();

  const orderedArray = orderArrayOfObjectByProperty(products, 'id');

  return orderedArray;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) {
    throw new Error({ code: 404, message: 'Product not found' });
  }

  return product;
};

module.exports = {
  getAll,
  getById,
};
