const ApiErrors = require('../exceptions/exceptions');

module.exports = function (error, request, response, next) {
  if (error instanceof ApiErrors) {
    return response
      .status(error.status)
      .json({ message: error.message, errors: error.errors });
  }

  return response.status(500).json({ message: 'Uncaught error'})
};
