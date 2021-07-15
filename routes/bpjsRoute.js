const bpjsRoute = require("express").Router();
const { userAuthorization } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateRequestMiddleware");
const { customerNumberSchema } = require("../schema/requestSchema");
const bpjsController = require("../controller/bpjsController");

bpjsRoute.get("/period", userAuthorization, bpjsController.getPeriod);

bpjsRoute.post(
  "/customer/info",
  validate(customerNumberSchema),
  userAuthorization,
  bpjsController.getBpjsCustomerInfo
);

bpjsRoute.post("/new/bill", userAuthorization, bpjsController.createNewBill);

module.exports = bpjsRoute;
