const models = require("../database/models");
const { get } = require("../routes/mobileRoute");

exports.getAllMobile = async (req, res) => {
  try {
    const getmobile = await models.Options.findAll({
      where: { service_id: 2 },
      attributes: ["id", "name", "image_url"],
    });

    const respayload = {
      statusText: "Ok",
      message: "Mobile option success",
      statusCode: 200,
      result: getmobile,
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

exports.getProviders = async (req, res) => {
  try {
    const providers = await models.Mobile_cards.findAll({
      attributes: ["id", "prefix", "name"],
      include: { model: models.Mobile_providers, attributes: ["name"] },
    });

    if (providers === null) {
      return res.status(401).json({
        statusText: "Not Found",
        message: "Phone Number Doesn't Exist",
      });
    } else {
      res.status(200).json({
        statusText: "Success",
        message: "Phone number exist",
        result: providers,
      });
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.getprices = async (req, res) => {
  try {
    const getpricelist = await models.Option_prices.findAll({
      attributes: ["id", "price_id", "provider", "package_name", "description"],
      where: { option_id: req.body.option_id },
      include: { model: models.Prices, attributes: ["price"] },
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

exports.getMobileAcc = async (req, res) => {
  try {
    const account = await models.Mobile_providers.findOne({
      attributes: ["name"],
      include: {
        model: models.Mobile_cards,
        attributes: [],
        include: {
          model: models.Mobiles,
          attributes: [],
          where: { phone_number: req.body.phone_number },
        },
      },
    });
    const getPrice = await models.Option_prices.findOne({
      where: { id: req.body.option_price_id },
      attributes: ["package_name", "description"],
    });

    if (account === null) {
      return res.status(204).json({
        statusText: "Not Found",
        message: "Phone Number Doesn't Exist",
      });
    } else {
      res.status(200).json({
        statusText: "Success",
        message: "Phone number exist",
        result: {
          phone_number: req.body.phone_number,
          admin_fee: 1500,
          bill: {
            price: req.body.bill,
            package_name: getPrice.package_name,
            description: getPrice.description,
          },
          total: 1500 + parseInt(req.body.bill),
          provider: account.name,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
