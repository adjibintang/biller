const paymentService = require("../service/paymentService");

exports.bankTransferConfirmation = async (req, res) => {
  try {
    const confirmPayment = await paymentService.bankTransferConfirmation(
      req.body.transactionId,
      req.body.bankTransferId,
      req.file
    );

    return res.status(200).json({
      statusText: "Ok",
      message: "Payment Created",
      data: confirmPayment,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
