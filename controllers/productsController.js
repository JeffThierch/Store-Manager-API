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

module.exports = {
  getAll,
  getById,
};
