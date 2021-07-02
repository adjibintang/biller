const models = require("../database/models");

const account = {};

account.getmobileacc = async (req, res) => {
  try {
    const account = await models.Mobiles.findOne({
      attributes: ["mobile_card_id", "phone_number"],
      where: { phone_number: req.body.phone_number },
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
        result: account,
      });
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};
module.exports = account;
