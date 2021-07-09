const models = require("../database/models");

exports.getTokenAccInfo = async (req, res) => {
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
    const Voucher = req.body.Voucher;
    const Admin = 1500;
    const Total = parseInt(Voucher) + parseInt(Admin);
    console.log(accInfo);
    accInfo = {
      Phone_number: req.body.phone_number,
      Provider: accInfo.name,
      Voucher: `Rp. ${new Intl.NumberFormat("id").format(req.body.Voucher)},00`,
      Admin: `Rp. ${new Intl.NumberFormat("id").format(Admin)},00`,
      Total: `Rp. ${new Intl.NumberFormat("id").format(Total)},00`,
    };
    res.status(200).json({
      statusText: "Success",
      message: "get bill pulsa",
      result: accInfo,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
