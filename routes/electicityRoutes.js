const electricityRouter = require('express').Router();
const { getTagihanAccInfo, getElectricityOptions, getTokenPricelist, getTokenAccInfo, postTagihanBill } = require('../controller/electricityController');
const middleware = require("../middleware/authMiddleware");

electricityRouter.get("/tagihan/info", middleware.userAuthorization, getTagihanAccInfo);
electricityRouter.get("/options/:service_id", middleware.userAuthorization, getElectricityOptions);
electricityRouter.get("/token/blank", middleware.userAuthorization, getTokenPricelist);
electricityRouter.get("/token/info", middleware.userAuthorization, getTokenAccInfo);
electricityRouter.post("/tagihan/bankpayment", middleware.userAuthorization, postTagihanBill);


module.exports = electricityRouter;
