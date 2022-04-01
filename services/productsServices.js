const productsModel = require('../models/ProductsModel');
const productValidations = require('./validations/productsValidations');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) {
    throw new Error('PRODUCT_NOT_FOUND');
  }

  return product;
};

const createProduct = async ({ name, quantity }) => {
  productValidations.validateCreateProductFields({ name, quantity });

  const newProduct = await productsModel.createProduct({ name, quantity });

  return newProduct;
};

module.exports = {
  getAll,
  getById,
  createProduct,
};
