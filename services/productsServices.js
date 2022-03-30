const productsModel = require('../models/ProductsModel');
const { orderArrayOfObjectByProperty } = require('./helpers');

const getAll = async () => {
  const products = await productsModel.getAll();

  const orderedArray = orderArrayOfObjectByProperty(products, 'id');

  return orderedArray;
};

module.exports = {
  getAll,
};
