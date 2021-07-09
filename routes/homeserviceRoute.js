const Router = require("express").Router();
const auth  = require("../middleware/authMiddleware");
const homeServiveController = require("../controller/homeservicecontroller");

Router.get(
  "/homeservice",
  auth.userAuthorization,
  homeServiveController.getAllService
);

 
(module.exports = Router);