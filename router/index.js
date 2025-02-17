const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware.js')

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/activate/:link', userController.activate); 
router.get('/refresh', userController.refresh);

module.exports = router;