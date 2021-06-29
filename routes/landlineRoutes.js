const landlineRouter = require('express').Router();
const { getLandlineAccInfo } = require('../controller/landlineController');
const middleware = require("../middleware/authMiddleware");

landlineRouter.get("/info", middleware.userAuthorization, getLandlineAccInfo);

module.exports = landlineRouter;