const validateIfProductIdExist = (productId) => productId !== undefined;

const validateIfQuantityExist = (quantity) => quantity !== undefined;

const validateQuantity = (quantity) => quantity >= 1;

const validateCreateSaleProductFields = ({ name, quantity }) => {
  switch (true) {
    case !validateIfProductIdExist(name):
      throw new Error('UND_PRODUCT_ID_FIELD');
    case !validateIfQuantityExist(quantity):
      throw new Error('UND_QUANT_FIELD');
    case !validateQuantity(quantity):
      throw new Error('SHORT_QUANT_FIELD');
    default:
      return true;
  }
};

module.exports = {
  validateCreateSaleProductFields,
};
