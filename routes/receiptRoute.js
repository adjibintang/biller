const receiptRoute = require("express").Router();
const { userAuthorization } = require("../middleware/authMiddleware");
const receiptController = require("../controller/receiptController");

receiptRoute.get("/:billId", userAuthorization, receiptController.getReceipt);

module.exports = receiptRoute;
