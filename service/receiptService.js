const Models = require("../database/models");

exports.getReceipt = async (bill_id) => {
  try {
    const getServiceType = await Models.bills.findOne({
      attributes: ["bill_type"],
      where: { id: bill_id },
      include: {
        model: Models.transactions,
        attributes: [],
        where: { status: "Success" },
      },
    });

    if (getServiceType === null) return null;

    if (getServiceType.dataValues.bill_type === "Listrik-Token")
      return getListrikTokenReceipt(bill_id);

    if (getServiceType.dataValues.bill_type === "Listrik-Tagihan")
      return getListrikTagihanReceipt(bill_id);

    if (getServiceType.dataValues.bill_type === "Mobile")
      return getMobileReceipt(bill_id);

    if (getServiceType.dataValues.bill_type === "Internet-TV")
      return getInternetTVReceipt(bill_id);

    if (getServiceType.dataValues.bill_type === "Landline")
      return getLandlineReceipt(bill_id);

    if (getServiceType.dataValues.bill_type === "PDAM")
      return getPdamReceipt(bill_id);

    if (getServiceType.dataValues.bill_type === "BPJS")
      return getBpjsReceipt(bill_id);

    return null;
  } catch (error) {
    return error.message;
  }
};

const getListrikTokenReceipt = async (bill_id) => {
  try {
    const listrikTokenReceipt = await Models.pln_token_bills.findOne({
      where: { bill_id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const recurring = await getReccuringBill(bill_id);

    return {
      receipt: listrikTokenReceipt,
      recurring,
    };
  } catch (error) {
    return error.message;
  }
};

const getListrikTagihanReceipt = async (bill_id) => {
  try {
    const listrikTagihanReceipt = await Models.pln_tagihan_bills.findOne({
      where: { bill_id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const recurring = await getReccuringBill(bill_id);

    return {
      receipt: listrikTagihanReceipt,
      recurring,
    };
  } catch (error) {
    return error.message;
  }
};

const getMobileReceipt = async (bill_id) => {
  try {
    const mobileReceipt = await Models.mobile_bills.findOne({
      where: { bill_id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const recurring = await getReccuringBill(bill_id);

    return {
      receipt: mobileReceipt,
      recurring,
    };
  } catch (error) {
    return error.message;
  }
};

const getInternetTVReceipt = async (bill_id) => {
  try {
    const internetTVReceipt = await Models.internet_tv_bills.findOne({
      where: { bill_id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const recurring = await getReccuringBill(bill_id);

    return {
      receipt: internetTVReceipt,
      recurring,
    };
  } catch (error) {
    return error.message;
  }
};

const getLandlineReceipt = async (bill_id) => {
  try {
    const landlineReceipt = await Models.landline_bills.findOne({
      where: { bill_id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const recurring = await getReccuringBill(bill_id);

    return {
      receipt: landlineReceipt,
      recurring,
    };
  } catch (error) {
    return error.message;
  }
};

const getBpjsReceipt = async (bill_id) => {
  try {
    const bpjsReceipt = await Models.bpjs_bills.findOne({
      where: { bill_id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const recurring = await getReccuringBill(bill_id);

    return {
      receipt: bpjsReceipt,
      recurring,
    };
  } catch (error) {
    return error.message;
  }
};

const getPdamReceipt = async (bill_id) => {
  try {
    const pdamReceipt = await Models.pdam_bills.findOne({
      where: { bill_id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const recurring = await getReccuringBill(bill_id);

    return {
      receipt: pdamReceipt,
      recurring,
    };
  } catch (error) {
    return error.message;
  }
};

const getReccuringBill = async (bill_id) => {
  try {
    const recurringBill = await Models.recurring_billings.findOne({
      where: { bill_id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "is_delete", "due_date"],
      },
    });

    return recurringBill;
  } catch (error) {
    return error.message;
  }
};
