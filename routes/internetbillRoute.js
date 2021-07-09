const Router = require("express").Router();
// const auth = require("../middleware/authMiddleware");

const internetbill = require("../controller/internetbillController");

Router.get("/internet", internetbill.getinternetbill);

module.exports = Router;
