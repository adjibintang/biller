const bpjsService = require("../service/bpjsService");

exports.getPeriod = async (req, res) => {
  try {
    const periodResult = await bpjsService.getPeriod();

    return res.status(200).json({
      statusText: "Ok",
      message: "Success Get Period",
      data: periodResult,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.getBpjsCustomerInfo = async (req, res) => {
  try {
    const customerInfoResult = await bpjsService.getCustomerInfo(
      req.body.customerNumber,
      req.body.month ? req.body.month : 1
    );

    if (customerInfoResult === null) return res.sendStatus(204);

    return res.status(200).json({
      statusText: "Ok",
      message: "BPJS Customer Information",
      data: customerInfoResult,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.createNewBill = async (req, res) => {
  try {
    const createNewBillResult = await bpjsService.newBill(
      req.body,
      req.user.id
    );

    return res.status(200).json({
      statusText: "Ok",
      message: "Create New Bill",
      data: createNewBillResult,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
