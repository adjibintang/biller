const receiptService = require("../service/receiptService");

exports.getReceipt = async (req, res) => {
  try {
    const receiptResult = await receiptService.getReceipt(req.params.billId);

    if (receiptResult === null) return res.sendStatus(204);

    return res.status(200).json({
      statusText: "Ok",
      message: "Success Get Receipt",
      data: receiptResult,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
