const pdamRouter = require("express").Router();
const { validate } = require("../middleware/validateRequestMiddleware");
const { searchCitySchema } = require("../schema/requestSchema");
const { userAuthorization } = require("../middleware/authMiddleware");
const pdamController = require("../controller/pdamController");

pdamRouter.get("/region/all", userAuthorization, pdamController.getCities);

pdamRouter.get(
  "/region/search",
  userAuthorization,
  pdamController.searchRegion
);

pdamRouter.get(
  "/customer/info",
  userAuthorization,
  pdamController.getPdamCustomerInfo
);

pdamRouter.post("/new", userAuthorization, pdamController.payPdamBill);

module.exports = pdamRouter;
