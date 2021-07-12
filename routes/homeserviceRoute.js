const Router = require("express").Router();
const { userAuthorization } = require("../middleware/authMiddleware");
const homeServiveController = require("../controller/homeservicecontroller");

Router.get("/service", userAuthorization, homeServiveController.getAllService);

module.exports = Router;
