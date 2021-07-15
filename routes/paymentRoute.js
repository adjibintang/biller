const paymentRoute = require("express").Router();
const paymentController = require("../controller/paymentController");
const firebase = require("../middleware/firebaseMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateRequestMiddleware");
const { newPaymentCardSchema } = require("../schema/requestSchema");

paymentRoute.post(
  "/bank-transfer/confirmation",
  firebase.upload.single("receipt"),
  authMiddleware.userAuthorization,
  paymentController.bankTransferConfirmation
);

paymentRoute.get(
  "/bank/list",
  authMiddleware.userAuthorization,
  paymentController.getBillerBankAccount
);

paymentRoute.post(
  "/new/card",
  validate(newPaymentCardSchema),
  authMiddleware.userAuthorization,
  paymentController.addNewPaymentCard
);

module.exports = paymentRoute;
