const authController = require("../controller/auth");
const authValidator = require("../middleware/authValidation");
const router = require("express").Router();

router.post("/signup", authValidator.signup, authController.signup);
router.get("/confirm/:confirmationCode", authController.confirmUser);

module.exports = router;
