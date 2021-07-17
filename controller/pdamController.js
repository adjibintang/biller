const pdamService = require("../service/pdamService");

exports.getCities = async (req, res) => {
  try {
    const citiesResult = await pdamService.getCities();

    return res.status(200).json({
      statusText: "Ok",
      message: "Get All Region",
      data: citiesResult,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.searchRegion = async (req, res) => {
  try {
    const regionSearchResult = await pdamService.searchCity(req.query.name);

    return res.status(200).json({
      statusText: "Ok",
      message: "Search Region",
      data: regionSearchResult,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getPdamCustomerInfo = async (req, res) => {
  try {
    const accountInformationResult = await pdamService.getCustomerInfo(
      req.body.customerNumber,
      req.user.pin
    );

    if (accountInformationResult === null) return res.sendStatus(204);

    if (
      accountInformationResult.hasOwnProperty("status") &&
      accountInformationResult.status === 202
    )
      return res.status(202).json({
        statusText: "Accepted",
        message: accountInformationResult.message,
      });

    return res.status(200).json({
      statusText: "Ok",
      message: "PDAM Account Information",
      data: accountInformationResult,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.payPdamBill = async (req, res) => {
  try {
    const payPdamBillRessult = await pdamService.postNewPdamBill(
      req.body,
      req.user.id
    );

    if (payPdamBillRessult === null) return res.sendStatus(204);

    if (
      payPdamBillRessult.hasOwnProperty("status") &&
      payPdamBillRessult.status === 202
    )
      return res.status(202).json({
        statusText: "Accepted",
        message: payPdamBillRessult.message,
      });

    return res.status(200).json({
      statusText: "Ok",
      message: "Create New PDAM Bill",
      data: payPdamBillRessult,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
