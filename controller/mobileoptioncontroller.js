const models = require("../database/models");
const mobileOption = {};

mobileOption.getAllMobile = async (req, res) => {
  try {
    const getmobile = await models.Options.findAll({
      where: {service_id:2},
      attributes: ["id", "name"],
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

module.exports = mobileOption;
