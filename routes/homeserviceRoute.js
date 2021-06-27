const Router = require("express").Router();

const homeServiveController = require("../controller/homeservicecontroller");

Router.get("/homeservice", homeServiveController.getAllService)



module.exports = Router