const notificationRouter = require('express').Router();
const { getNotifications } = require('../controller/notificationController');
const middleware = require("../middleware/authMiddleware");

notificationRouter.get("/", middleware.userAuthorization, getNotifications);

module.exports = notificationRouter;