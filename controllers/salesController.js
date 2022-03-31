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

module.exports = {
  getAll,
  getById,
};
