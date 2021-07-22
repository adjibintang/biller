const subscriptionRoute = require("express").Router();
const { userAuthorization } = require("../middleware/authMiddleware");
const subscriptionController = require("../controller/subscriptionController");

subscriptionRoute.get(
  "/all",
  userAuthorization,
  subscriptionController.getSubscription
);

subscriptionRoute.put(
  "/cancel",
  userAuthorization,
  subscriptionController.cancelSubscription
);

module.exports = subscriptionRoute;
