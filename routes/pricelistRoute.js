const Router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const pricelist = require("../controller/priceslistcontroller");

Router.get("/pricelist", auth.userAuthorization, pricelist.getprices);

module.exports = Router;
