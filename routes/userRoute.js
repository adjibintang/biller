const userRouter = require("express").Router();
const { userAuthorization } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateRequestMiddleware");
const firebase = require("../middleware/firebaseMiddleware");
const { updateSchema } = require("../schema/requestSchema");
const userController = require("../controller/userController");

userRouter.put("/update", [userAuthorization, validate(updateSchema)], userController.update);
userRouter.post("/upload-profile", firebase.upload.single("image"), userController.updatePhoto);

module.exports = userRouter;

