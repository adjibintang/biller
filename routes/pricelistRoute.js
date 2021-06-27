const Router = require("express").Router();

const pricelist = require("../controller/priceslistcontroller");

Router.get("/pricelist", pricelist.getprices);

module.exports = Router;
