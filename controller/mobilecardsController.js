const models = require("../database/models");
// const mobile_cards = require("../database/models/mobile_providers");
const cards = {};

cards.getcards = async (req, res) => {
  try {
    const getcard = await models.Mobile_cards.findAll({
      attributes: ["mobile_provider_id", "prefix","name"],
      include:{model: models.Mobile_providers, attributes: ["id", "name"]}
    });

    const respayload = {
      statusText: "Ok",
      message: "get providers success",
      statusCode: 200,
      result: getcard,
    };
    res.json(respayload);
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Error",
      result: error.message,
    });
  }
};

module.exports = cards;
