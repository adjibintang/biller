const Router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const newbill = require("../controller/newBillmobileController");

Router.post("/newbill", auth.userAuthorization, newbill.createnewbillinternet);

module.exports = Router;
