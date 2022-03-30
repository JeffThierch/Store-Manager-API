const salesModel = require('../models/SalesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  if (!sale) {
    throw new Error('SALE_NOT_FOUND');
  }

  return sale;
};

module.exports = {
  getAll,
  getById,
};
