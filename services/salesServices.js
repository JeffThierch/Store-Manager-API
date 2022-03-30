const salesModel = require('../models/SalesModel');
const { orderArrayOfObjectByProperty } = require('./helpers');

const getAll = async () => {
  const sales = await salesModel.getAll();

  const orderedArray = orderArrayOfObjectByProperty(sales, 'id');

  return orderedArray;
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
