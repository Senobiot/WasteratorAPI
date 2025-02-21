const Router = require('express').Router;
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware.js')
const gamesController = require('../controllers/games-controller.js');

router.get('/searchGame', authMiddleware, gamesController.searchGame);
router.post('/getGameDetails', authMiddleware, gamesController.getDetails);

module.exports = router;