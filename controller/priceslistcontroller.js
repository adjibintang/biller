const models = require("../database/models");
const prices = {};

prices.getprices = async (req, res) => {
  try {
    const getpricelist = await models.Prices.findAll({
      attributes: ["id", "price"],
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

module.exports = prices;
