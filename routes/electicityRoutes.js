const electricityRouter = require('express').Router();
const { getTagihanAccInfo, getElectricityOptions, getTokenPricelist, getTokenAccInfo } = require('../controller/electricityController');

electricityRouter.get("/tagihan/info", getTagihanAccInfo);
electricityRouter.get("/options/:service_id", getElectricityOptions);
electricityRouter.get("/token/blank", getTokenPricelist);
electricityRouter.get("/token/info", getTokenAccInfo);

module.exports = electricityRouter;
