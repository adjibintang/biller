const landlineRouter = require('express').Router();
const { getLandlineAccInfo } = require('../controller/landlineController');

landlineRouter.get("/info", getLandlineAccInfo);

module.exports = landlineRouter;