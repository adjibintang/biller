const models = require("../database/models");
const mobileService = require("../service/mobileService");

exports.getAllMobile = async (req, res) => {
  try {
    const mobileServiceResult = await mobileService.getMobileServices(2);

    const respayload = {
      statusText: "Ok",
      message: "Mobile option success",
      data: mobileServiceResult,
    };
    res.status(200).json(respayload);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.getProviders = async (req, res) => {
  try {
    const providersResult = await mobileService.getProviders();

    if (providersResult === null) {
      return res.status(401).json({
        statusText: "Not Found",
        message: "Phone Number Doesn't Exist",
      });
    } else {
      res.status(200).json({
        statusText: "Success",
        message: "Phone number exist",
        result: providersResult,
      });
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.getprices = async (req, res) => {
  try {
    const priceListResult = await mobileService.getPriceList(req.body.optionId);

    const respayload = {
      statusText: "Ok",
      message: "Pricelist success",
      result: priceListResult,
    };
    res.status(200).json(respayload);
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.getMobileAcc = async (req, res) => {
  try {
    const mobileInfoResult = await mobileService.getCustomerInfo(
      req.body.phoneNumber,
      req.body.optionPriceId,
      req.body.provider,
      req.body.optionId
    );

    if (mobileInfoResult === null) {
      return res.status(204).json({
        statusText: "Not Found",
        message: "Phone Number Doesn't Exist",
      });
    } else {
      res.status(200).json({
        statusText: "Success",
        message: "Phone number exist",
        result: mobileInfoResult,
      });
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.newMobileBill = async (req, res) => {
  try {
    const newMobileBillResult = await mobileService.newBill(
      req.body,
      req.user.id
    );

    return res.status(201).json({
      statusText: "Created",
      message: "Success Create New Mobile Bill",
      data: newMobileBillResult,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
