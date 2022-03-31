const salesServices = require('../services/salesServices');

const getAll = async (_req, res) => {
  const sales = await salesServices.getAll();

  return res.status(200).json(sales);
};

module.exports = {
  getAll,
};
