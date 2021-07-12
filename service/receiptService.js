const Models = require("../database/models");

exports.getReceipt = async (billId) => {
  try {
    const getServiceType = await Models.bills.findOne({
      attributes: ["bill_type"],
      where: { id: billId },
      include: {
        model: Models.transactions,
        attributes: [],
        where: { status: "Success" },
      },
    });

    if (getServiceType === null) return null;

    if (getServiceType.dataValues.bill_type === "BPJS")
      return getBpjsReceipt(billId);

    return null;
  } catch (error) {
    return error.message;
  }
};

const getBpjsReceipt = async (billId) => {
  try {
    const bpjsReceipt = await Models.bpjs_bills.findOne({
      where: { bill_id: billId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const recurring = await getReccuringBill(billId);

    return {
      receipt: bpjsReceipt,
      recurring,
    };
  } catch (error) {
    return error.message;
  }
};

const getReccuringBill = async (billId) => {
  try {
    const recurringBill = await Models.recurring_billings.findOne({
      where: { bill_id: billId },
      attributes: {
        exclude: ["createdAt", "updatedAt", "is_delete", "due_date"],
      },
    });

    return recurringBill;
  } catch (error) {
    return error.message;
  }
};
