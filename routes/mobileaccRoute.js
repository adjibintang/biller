const Router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const mobileacc = require("../controller/mobileaccController");

Router.get("/acc", auth.userAuthorization, mobileacc.getmobileacc);

module.exports = Router;
