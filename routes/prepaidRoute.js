const Router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const prepaid = require("../controller/prepaidController");

Router.get("/prepaid", auth.userAuthorization, prepaid.getprepaid);

module.exports = Router;
