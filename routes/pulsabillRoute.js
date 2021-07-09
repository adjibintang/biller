const Router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const pulsabill = require("../controller/pulsabillController");

Router.get("/pulsa", auth.userAuthorization, pulsabill.getTokenAccInfo);

module.exports = Router;
