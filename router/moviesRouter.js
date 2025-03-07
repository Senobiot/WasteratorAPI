const Router = require("express").Router;
const moviesController = require("../controllers/movies-controller.js");
const router = new Router();
const authMiddleware = require("../middlewares/auth-middleware.js");

router.get("/searchMovie", authMiddleware, moviesController.searchMovie);
router.get("/getDetails", authMiddleware, moviesController.getDetails);

module.exports = router;
