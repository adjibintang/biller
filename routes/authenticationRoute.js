const authRouter = require("express").Router();
const { validate } = require("../middleware/validateRequestMiddleware");
const { loginSchema, registerSchema } = require("../schema/requestSchema");
const { login } = require("../middleware/authMiddleware");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

authRouter.post(
  "/login",
  validate(loginSchema),
  login,
  userController.getToken
);

authRouter.post("/signup", validate(registerSchema), authController.signup);

authRouter.get("/confirm/:confirmationCode", authController.confirmUser);

module.exports = authRouter;
