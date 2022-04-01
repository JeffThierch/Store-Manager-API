const salesModel = require('../models/SalesModel');
const salesValidations = require('./validations/salesValidations');

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

const createSaleProduct = async (salesArray) => {
  salesArray.forEach((product) => {
    salesValidations.validateCreateSaleProductFields(product);
  });

  const newSale = await salesModel.createSaleProduct(salesArray);

  return newSale;
};

module.exports = {
  getAll,
  getById,
  createSaleProduct,
};
