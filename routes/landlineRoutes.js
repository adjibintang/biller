const landlineRouter = require('express').Router();
const { getLandlineAccInfo } = require('../controller/landlineController');

landlineRouter.get("/info", middleware.userAuthorization, getLandlineAccInfo);

module.exports = landlineRouter;