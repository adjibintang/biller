const Router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const Electricity = require("../controller/electricityController");

Router.post("/electricity", Electricity.postTagihanBill);

//  auth.userAuthorization, 
 (module.exports = Router);
