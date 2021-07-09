const models = require("../database/models");

exports.getprepaid = async (req, res) => {
  try {
    let accInfo = await models.Mobile_cards.findOne({
      attributes: ["name"],
      include: {
          model: models.Mobiles,
          where: { phone_number: req.body.phone_number },
        },
      },
    );
    accInfo = accInfo.dataValues;
    const Bill = req.body.Bill;
    const Admin = 1500;
    const Total = parseInt(Bill) + parseInt(Admin);
    console.log(accInfo);
    accInfo = {
      Phone_number: req.body.phone_number,
      Provider: accInfo.name,
      Bill: `Rp. ${new Intl.NumberFormat("id").format(req.body.Bill)},00`,
      Admin: `Rp. ${new Intl.NumberFormat("id").format(Admin)},00`,
      Total: `Rp. ${new Intl.NumberFormat("id").format(Total)},00`,
    };
    res.status(200).json({
      statusText: "Success",
      message: "get bill prepaid",
      result: accInfo,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
