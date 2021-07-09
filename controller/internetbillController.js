const models = require("../database/models");

exports.getinternetbill = async (req, res) => {
  try {
    let accInfo = await models.Mobile_providers.findOne({
      attributes: ["name"],
      include: {
        attributes: [],
        model: models.Mobile_cards,
        include: {
          model: models.Mobiles,
          where: { phone_number: req.body.phone_number },
        },
      },
    });
    accInfo = accInfo.dataValues;
    const description = await models.Option_prices.findAll({
      provider: { where: accInfo.name},
      attributes: ["package_name"],
      
    })
    const packages = req.body.Internet_package;
    const Admin = 1500;
    const Total = parseInt(packages) + parseInt(Admin);
    
    accInfo = {
      Phone_number: req.body.phone_number,
      Provider: accInfo.name,
      Internet_Package: `Rp. ${new Intl.NumberFormat("id").format(
        req.body.Internet_package,
      )},00`,
      Description: description,
      Admin: `Rp. ${new Intl.NumberFormat("id").format(Admin)},00`,
      Total: `Rp. ${new Intl.NumberFormat("id").format(Total)},00`,
      };
    res.status(200).json({
      statusText: "Success",
      message: "get internet bill",
      result: accInfo,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
