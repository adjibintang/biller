const electricityRouter = require('express').Router();
const { getTagihanAccInfo, getElectricityOptions, getTokenPricelist, getTokenAccInfo, postTagihanBill, postTokenBill } = require('../controller/electricityController');
const middleware = require("../middleware/authMiddleware");

electricityRouter.post("/tagihan/info", middleware.userAuthorization, getTagihanAccInfo);
electricityRouter.get("/options/:service_id", middleware.userAuthorization, getElectricityOptions);
electricityRouter.post("/token/blank", middleware.userAuthorization, getTokenPricelist);
electricityRouter.post("/token/info", middleware.userAuthorization, getTokenAccInfo);
electricityRouter.post("/tagihan/bankpayment", middleware.userAuthorization, postTagihanBill);
electricityRouter.post("/token/bankpayment", middleware.userAuthorization, postTokenBill);



module.exports = electricityRouter;
