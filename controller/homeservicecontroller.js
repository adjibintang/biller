const models = require("../database/models");
const homeServiveController = {};

homeServiveController.getAllService = async (req, res) => {
  try {
    const getservice = await models.Services.findAll({attributes:["id","name"]});

    const respayload = {
      statusText: "Ok",
      message: "Login Success",
      statusCode: 200,
      result: getservice,
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

module.exports = homeServiveController;
