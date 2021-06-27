const Router = require("express").Router();

const mobileOptionRoutes = require("../controller/mobileoptioncontroller");

Router.get("/mobilesoption", mobileOptionRoutes.getAllMobile);

module.exports = Router;
