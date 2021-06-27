const electricityRouter = require('express').Router();
const { getTagihanAccInfo, getElectricityOptions, getTokenPricelist, getTokenAccInfo } = require('../controller/electricityController');

electricityRouter.get("/electricity/tagihan/info", getTagihanAccInfo);
electricityRouter.get("/electricity/options/:id", getElectricityOptions);
electricityRouter.get("/electricity/token/blank", getTokenPricelist);
electricityRouter.get("/electricity/token/info", getTokenAccInfo);

module.exports = electricityRouter;
