const authRouter = require("express").Router();
const { validate } = require("../middleware/validateRequestMiddleware");
const { loginSchema } = require("../schema/requestSchema");
const { login } = require("../middleware/authMiddleware");
const userController = require("../controller/userController");

authRouter.post(
  "/login",
  validate(loginSchema),
  login,
  userController.getToken
);

module.exports = authRouter;
