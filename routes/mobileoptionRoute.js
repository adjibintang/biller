const Router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const mobileOptionRoutes = require("../controller/mobileoptioncontroller");

Router.get(
  "/mobilesoption",
  auth.userAuthorization,
  mobileOptionRoutes.getAllMobile
);

module.exports = Router;
