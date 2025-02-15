const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();

router.post('/registration', userController.registration);
router.post('/login');
router.post('/logout');
router.get('/users', userController.getUsers);
router.get('/activate/:link');
router.get('/refresh', userController.refresh);

module.exports = router;