const models = require("../database/models");
const prices = {};
const packages = {};

prices.getprices = async (req, res) => {
  try {
    const getpricelist = await models.Option_prices.findAll({
      attributes: ["id", "price_id", "provider", "package_name", "description"],
      where: { option_id: req.body.option_id },
    });

    const respayload = {
      statusText: "Ok",
      message: "pricelist success",
      statusCode: 200,
      result: getpricelist,
    };
    res.json(respayload);
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Error",
      result: error,
    });
  }
};

prices.getPackages = async (req, res) => {
  try {
    const getpackages = await models.Option_prices.findAll({
      attributes: ["id", "price_id", "provider", "package_name", "description"],
    });

    const respayload = {
      statusText: "Ok",
      message: "packages success",
      statusCode: 200,
      result: getpackages,
    };
    res.json(respayload);
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Error",
      result: error,
    });
  }
};






module.exports = prices;
