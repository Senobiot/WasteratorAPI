const Router = require("express").Router;
const userController = require("../controllers/user-controller.js");
const router = new Router();
const authMiddleware = require("../middlewares/auth-middleware.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.post(
  "/avatar",
  upload.single("file"),
  authMiddleware,
  userController.setAvatar
);

module.exports = router;
