const Router = require("express").Router();

const packagesList = require("../controller/packagescontroller");

Router.get("/packages", packagesList.getPackages);

module.exports = Router;
