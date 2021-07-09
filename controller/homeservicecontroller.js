const models = require("../database/models");
const homeServiveController = {};

homeServiveController.getAllService = async (req, res) => {
  try {
    const getservice = await models.Services.findOne({
      attributes: ["id", "name", "image_url"],
    });

    const respayload = {
      statusText: "Ok",
      message: "Get Home Success",
      statusCode: 200,
      result: getservice,
    };
    res.json(respayload);
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Error Get Home",
      result: error,
    });
  }
};

module.exports = homeServiveController;
