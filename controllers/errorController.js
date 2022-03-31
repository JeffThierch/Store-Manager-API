const { errorsObj } = require('./helpers');

const errorController = (err, _req, res, _next) => {
  if (errorsObj[err]) {
    const { code, message } = errorsObj[err];

    return res.status(code).json(message);
  }

  return res.status(500).json({ message: 'Server Error' });
};

module.exports = {
  errorController,
};
