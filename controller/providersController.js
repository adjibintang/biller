const models = require("../database/models");
const providers = {};



providers.getproviders = async (req, res) => {
  try {
    const providers = await models.Mobile_cards.findAll();
    

    if (providers === null) {
      return res.status(401).json({
        statusText: "Not Found",
        message: "Phone Number Doesn't Exist",
      });
    } else{
      res.status(200).json({
        statusText: "Success",
        message: "Phone number exist",
        result: providers
      })
    }
  }catch (error) {
    return res.sendStatus(500);
}
};
  module.exports = providers;
