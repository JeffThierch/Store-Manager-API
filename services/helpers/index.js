const orderArrayOfObjectByProperty = (array, property) => array.sort((a, b) => {
    if (a[property] < b[property]) {
      return -1;
    }

    if (a[property] > b[property]) {
      return 1;
    }

    return 0;
});

module.exports = {
  orderArrayOfObjectByProperty,
};
