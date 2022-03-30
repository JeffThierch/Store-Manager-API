const salesModel = require('../models/SalesModel');
const { orderArrayOfObjectByProperty } = require('./helpers');

const getAll = async () => {
  const sales = await salesModel.getAll();

  const orderedArray = orderArrayOfObjectByProperty(sales, 'id');

  return orderedArray;
};

module.exports = {
  getAll,
  getById,
};
