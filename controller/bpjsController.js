const bpjsService = require("../service/bpjsService");

exports.getBpjsCustomerInfo = async (req, res) => {
  try {
    const customerInfoResult = await bpjsService.getCustomerInfo(
      req.body.customerNumber
    );

    if (customerInfoResult === null) return res.sendStatus(204);
    if (customerInfoResult === 202)
      return res.status(202).json({
        statusText: "Accepted",
        message:
          "Your Account is Disabled, Please Contact The Office For Further Information",
      });

    return res.status(200).json({
      statusText: "Ok",
      message: "BPJS Customer Information",
      data: customerInfoResult,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.createNewBill = async (req, res) => {
  try {
    const createNewBillResult = await bpjsService.newBill(
      req.body,
      req.user.id
    );

    if (createNewBillResult === 204) return res.sendStatus(204);
    if (createNewBillResult === 202)
      return res.status(202).json({
        statusText: "Accepted",
        message:
          "Your Account is Disabled, Please Contact The Office For Further Information",
      });

    return res.status(200).json({
      statusText: "Ok",
      message: "Create New Bill",
      data: createNewBillResult,
    });
  } catch (error) {
    return res.sendStatus(5001);
  }
};
