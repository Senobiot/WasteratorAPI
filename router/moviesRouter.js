const Router = require('express').Router;
const userController = require('../controllers/user-controller.js');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware.js')

module.exports = router;