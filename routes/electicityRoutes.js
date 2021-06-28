const electricityRouter = require('express').Router();
const { getTagihanAccInfo, getElectricityOptions, getTokenPricelist, getTokenAccInfo } = require('../controller/electricityController');
const middleware = require("../middleware/authMiddleware");

electricityRouter.get("/tagihan/info", middleware.userAuthorization, getTagihanAccInfo);
electricityRouter.get("/options/:service_id", middleware.userAuthorization, getElectricityOptions);
electricityRouter.get("/token/blank", middleware.userAuthorization, getTokenPricelist);
electricityRouter.get("/token/info", middleware.userAuthorization, getTokenAccInfo);

module.exports = electricityRouter;
