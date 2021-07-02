const Router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const providers = require("../controller/providersController");

Router.get("/account", auth.userAuthorization, providers.getproviders);

module.exports = Router;
