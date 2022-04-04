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

  const productExist = await productsModel.getByName(name);

  if (productExist) {
    throw new Error('PRODUCT_ALREADY_EXIST');
  }

  const newProduct = await productsModel.createProduct({ name, quantity });

  return newProduct;
};

const updateProduct = async ({ id, name, quantity }) => {
  const productExist = await productsModel.getById(id);

  if (!productExist) {
    throw new Error('PRODUCT_NOT_FOUND');
  }

  productValidations.validateUpdateProductFields({ name, quantity });

  const newProduct = await productsModel.updateProduct({ id, name, quantity });

  return newProduct;
};

const deleteProduct = async (id) => {
  const productExist = await productsModel.getById(id);

  if (!productExist) {
    throw new Error('PRODUCT_NOT_FOUND');
  }

  const productWasDeleted = await productsModel.deleteProduct(id);

  return productWasDeleted;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
