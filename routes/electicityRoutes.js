const express = require('express');
const router = express.Router();
const { getTagihanAccInfo, getElectricityOptions, getTokenPricelist, getTokenAccInfo } = require('../controller/electricityController');

router.get("/electricity/tagihan/info", getTagihanAccInfo);
router.get("/electricity/options/:id", getElectricityOptions);
router.get("/electricity/token/blank", getTokenPricelist);
router.get("/electricity/token/info", getTokenAccInfo);

module.exports = router;
