const validateIfNameExist = (name) => name !== undefined;

const validateIfQuantityExist = (quantity) => quantity !== undefined;

const validateNameLength = (name) => name.length >= 5;

const validateQuantity = (quantity) => quantity >= 1;

const validateCreateProductFields = ({ name, quantity }) => {
  switch (true) {
    case !validateIfNameExist(name):
      throw new Error('UND_NAME_FIELD');
    case !validateIfQuantityExist(quantity):
      throw new Error('UND_QUANT_FIELD');
    case !validateNameLength(name):
      throw new Error('SHORT_NAME_FIELD');
    case !validateQuantity(quantity):
      throw new Error('SHORT_QUANT_FIELD');
    default:
      return true;
  }
};

const validateUpdateProductFields = ({ name, quantity }) => {
  switch (true) {
    case !validateIfNameExist(name):
      throw new Error('UND_NAME_FIELD');
    case !validateNameLength(name):
      throw new Error('SHORT_NAME_FIELD');
    case !validateIfQuantityExist(quantity):
      throw new Error('UND_QUANT_FIELD');
    case !validateQuantity(quantity):
      throw new Error('SHORT_QUANT_FIELD');
    default:
      return true;
  }
};

module.exports = {
  validateCreateProductFields,
  validateUpdateProductFields,
};
