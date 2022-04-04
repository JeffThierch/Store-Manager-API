const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const products = await productsServices.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productsServices.getById(id);

    return res.status(200).json(product);
  } catch (err) {
    return next(err.message);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await productsServices.createProduct({ name, quantity });

    res.status(201).json(newProduct);
  } catch (err) {
    return next(err.message);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const updatedProduct = await productsServices.updateProduct({ id, name, quantity });

    return res.status(200).json(updatedProduct);
  } catch (err) {
    return next(err.message);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await productsServices.deleteProduct(id);

    return res.status(204).json({});
  } catch (err) {
    return next(err.message);
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
