const authRouter = require("express").Router();
const { userAuthorization } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateRequestMiddleware");
const firebase = require("../middleware/firebaseMiddleware");
const { loginSchema, registerSchema } = require("../schema/requestSchema");
const { login } = require("../middleware/authMiddleware");
const userController = require("../controller/userController");

authRouter.post(
  "/login",
  validate(loginSchema),
  login,
  userController.getToken
);

authRouter.post("/signup", validate(registerSchema), userController.signup);

authRouter.get("/confirm/:confirmationCode", userController.confirmUser);

module.exports = authRouter;
