const Router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const pricelist = require("../controller/priceslistcontroller");

Router.get("/pricelist", auth.userAuthorization, pricelist.getprices);
Router.get("/packages", auth.userAuthorization, pricelist.getPackages);

module.exports = Router;
