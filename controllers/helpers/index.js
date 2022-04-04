const errorsObj = {
  PRODUCT_NOT_FOUND: { code: 404, message: 'Product not found' },
  SALE_NOT_FOUND: { code: 404, message: 'Sale not found' },
  UND_PRODUCT_ID_FIELD: { code: 400, message: '"productId" is required' },
  UND_QUANT_FIELD: { code: 400, message: '"quantity" is required' },
  SHORT_QUANT_FIELD: { code: 422, message: '"quantity" must be greater than or equal to 1' },
  UND_NAME_FIELD: { code: 400, message: '"name" is required' },
  SHORT_NAME_FIELD: { code: 422, message: '"name" length must be at least 5 characters long' },
  PRODUCT_ALREADY_EXIST: { code: 409, message: 'Product already exists' },
  INVALID_SELL_AMOUNT: { code: 422, message: 'Such amount is not permitted to sell' },
};

module.exports = {
  errorsObj,
};
