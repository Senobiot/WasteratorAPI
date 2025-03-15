const ApiErrors = require("../exceptions/exceptions");
const tokenService = require("../services/token-service");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiErrors.UnauthorizedError());
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiErrors.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiErrors.UnauthorizedError());
    }
    req.body.user = userData;
    next();
  } catch (error) {
    return next(ApiErrors.UnauthorizedError());
  }
};
