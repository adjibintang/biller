const landlineRouter = require('express').Router();
const { getLandlineAccInfo, postLandlineBill } = require('../controller/landlineController');
const middleware = require("../middleware/authMiddleware");

landlineRouter.get("/info", middleware.userAuthorization, getLandlineAccInfo);
landlineRouter.post("/bankpayment", middleware.userAuthorization, postLandlineBill);

module.exports = landlineRouter;