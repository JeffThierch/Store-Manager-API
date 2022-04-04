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
    salesValidations.validateSaleProductFields(product);
  });

  const isQuantityValid = await Promise.all(
    salesArray.map(((product) => salesValidations.validateProductQuantity(product))),
  );

  if (isQuantityValid.some((quantity) => quantity === false)) {
    throw new Error('INVALID_SELL_AMOUNT');
  }

  const newSale = await salesModel.createSaleProduct(salesArray);

  return newSale;
};

const updateSale = async ({ id, itemsToUpdate }) => {
  const saleExist = await salesModel.getById(id);

  if (!saleExist) {
    throw new Error('SALE_NOT_FOUND');
  }

  itemsToUpdate.forEach((item) => {
    salesValidations.validateSaleProductFields(item);
  });

  const newSale = await salesModel.updateSale({ id, itemsToUpdate });

  return newSale;
};

const deleteSale = async (id) => {
  const saleExist = await salesModel.getById(id);

  if (!saleExist) {
    throw new Error('SALE_NOT_FOUND');
  }

  const saleWasDeleted = await salesModel.deleteSale(id);

  return saleWasDeleted;
};

module.exports = {
  getAll,
  getById,
  createSaleProduct,
  updateSale,
  deleteSale,
};
