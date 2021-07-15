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

exports.getBillerBankAccount = async (req, res) => {
  try {
    const billerBankAccountResult = await paymentService.billerBankAccounts();

    if (billerBankAccountResult === 204) res.sendStatus(204);

    res.status(200).json({
      statusText: "Ok",
      message: "Success Get Biller Bank Account",
      data: billerBankAccountResult,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.addNewPaymentCard = async (req, res) => {
  try {
    const addNewPaymentCardResult = await paymentService.addNewPaymentCard(
      req.body,
      req.user.id
    );

    if (addNewPaymentCardResult === 202)
      res.status(202).json({
        statusText: "Accepted",
        message: "Payment Card Already Exist",
      });

    res.status(201).json({
      statusText: "Created",
      message: "Success Add New Payment Card",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
