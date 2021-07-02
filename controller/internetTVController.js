const internetTVService = require("../service/internetTVService");

exports.getInternetTVOptions = async (req, res) => {
  try {
    const options = await internetTVService.getOptions(req.params.service_id);

    if (options.length <= 0) {
      return res.status(204).send({
        statusCode: 204,
        statusText: "No Content",
      });
    } else {
      res.status(200).send({
        statusCode: 200,
        statusText: "Succes",
        message: "Success to Get Internet & TV Options",
        data: options,
      });
    }
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
    const account = await internetTVService.getAccountInfo(
      req.body.customer_number
    );

    if (!account) {
      return res.status(204).send({
        statusCode: 204,
        statusText: "No Content",
      });
    } else {
      res.status(200).send({
        statusCode: 200,
        statusText: "Succes",
        message: "Success to Get Account Info",
        data: {
          name: account.name,
          customer_number: account.customer_number,
          provider: account.provider,
          address: account.address,
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

const {
  Internet_tvs,
  Bills,
  Internet_tv_bills,
} = require("../database/models");

exports.createInternetTVBill = async (req, res) => {
  try {
    const { option_id } = req.body;
    console.log(option_id);
    const createBill = await Bills.create({
      user_id: req.user.id,
      //   option_id: 1,
    });
    res.send("You're in");
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Failed tp Create Bill",
    });
  }
};
