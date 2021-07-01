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
      req.params.customerNumber
    );

    return res.status(200).json({
      statusText: "Ok",
      message: "PDAM Account Information",
      data: accountInformationResult,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
