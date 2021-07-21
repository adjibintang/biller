const Models = require("../database/models");

exports.getOngoingPurchase = async (userId) => {
  try {
    const ongoingBillList = await findBills(userId);
    const billDetail = await findDetails(ongoingBillList);

    return ongoingBillList;
  } catch (error) {
    return errrors.message;
  }
};

const findBills = async (userId) => {
  try {
    const billList = await Models.bills.findAll({
      attributes: ["id", "bill_type"],
      where: { user_id: userId },
      include: {
        model: Models.transactions,
        attributes: [],
        where: { status: "Process" },
        required: true,
      },
    });

    return billList;
  } catch (error) {
    return errrors.message;
  }
};

const findDetails = async (billList) => {
  try {
    billList.map((x) => {
      if (x.dataValues.bill_type === "Listrik-Token") console.log("Ok");
    });
  } catch (error) {
    return error.message;
  }
};
