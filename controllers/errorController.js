const { errorsObj } = require('./helpers');

const errorController = (err, _req, res, _next) => {
  const isValidationError = Object.prototype.hasOwnProperty.call(errorsObj, err);

  if (isValidationError) {
    const { code, message } = errorsObj[err];

    return res.status(code).json({ message });
  }
  console.log(err);
  return res.status(500).json({ message: 'Server Error' });
};

module.exports = {
  errorController,
};
