const { Internet_tvs, Options, Services } = require("../database/models");

exports.getInternetTVOptions = async (req, res) => {
  try {
    const findService = await Services.findOne({
      where: { name: req.body.service },
    });
    const service_id = findService.dataValues.id;

    const findOptions = await Options.findAll({ where: { service_id } });

    const options = findOptions.map((x) => x.dataValues.name);

    res.status(200).send({
      statusCode: 200,
      statusText: "Succes",
      message: "Success to Get Internet & TV Options",
      data: {
        options,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Failed to Get Internet TV Options",
    });
  }
};

exports.getInternetAccountInfo = async (req, res) => {
  try {
    const { customer_number } = req.body;

    const findInternetAccount = await Internet_tvs.findOne({
      where: { customer_number },
    });

    if (!findInternetAccount) {
      res.status(400).send({
        statusCode: 400,
        statusText: "Bad Request",
        message: "Failed to Get Account Info",
      });
    } else {
      res.status(200).send({
        statusCode: 200,
        statusText: "Succes",
        message: "Success to Get Account Info",
        data: {
          name: findInternetAccount.name,
          customer_number,
          provider: findInternetAccount.provider,
          address: findInternetAccount.address,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Failed to Get Internet Account Info",
    });
  }
};
