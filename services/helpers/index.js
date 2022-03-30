const orderArrayOfObjectByProperty = (array, property) => array.sort((a, b) => {
    if (a[property] < b[property]) {
      return -1;
    }

    if (a[property] > b[property]) {
      return 1;
    }

    return 0;
});

const Errors = {
  PRODUCT_NOT_FOUND: { code: 404, message: 'Product not found' },
};

module.exports = {
  orderArrayOfObjectByProperty,
  Errors,
};
