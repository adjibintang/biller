const models = require("../database/models");
const packages = {};

packages.getPackages = async (req, res) => {
  try {
    const getpackages = await models.Packages.findAll({attributes:["id","option_id","name","price","description"]});

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

module.exports = packages;
