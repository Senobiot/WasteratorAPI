const Router = require('express').Router;
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware.js')
const collectionController = require('../controllers/collection-controller.js');

router.post('/addToCollection', authMiddleware, collectionController.saveCollectable);

module.exports = router;