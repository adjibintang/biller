const landlineRouter = require('express').Router();
const { getLandlineAccInfo } = require('../controller/landlineController');

landlineRouter.get("/landline/receipt", getLandlineAccInfo);

module.exports = landlineRouter;