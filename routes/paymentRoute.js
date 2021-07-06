const paymentRoute = require("express").Router();
const paymentController = require("../controller/paymentController");
const firebase = require("../middleware/firebaseMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

paymentRoute.post(
  "/bank-transfer/confirmation",
  firebase.upload.single("receipt"),
  authMiddleware.userAuthorization,
  paymentController.bankTransferConfirmation
);

module.exports = paymentRoute;
