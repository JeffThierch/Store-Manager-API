const salesServices = require('../services/salesServices');

const getAll = async (_req, res) => {
  const sales = await salesServices.getAll();

  return res.status(200).json(sales);
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const sale = await salesServices.getById(id);

    return res.status(200).json(sale);
  } catch (err) {
    return next(err.message);
  }
};

const createSale = async (req, res, next) => {
  try {
    const products = req.body;

    const newSale = await salesServices.createSaleProduct(products);

    res.status(201).json(newSale);
  } catch (err) {
    return next(err.message);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itemsToUpdate = req.body;

    const updatedSale = await salesServices.updateSale({ id, itemsToUpdate });

    return res.status(200).json(updatedSale);
  } catch (err) {
    return next(err.message);
  }
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
};
