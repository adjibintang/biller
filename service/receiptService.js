const Models = require("../database/models");
const { Op } = require("sequelize");

exports.getReceipt = async (bill_id) => {
  try {
    const getServiceType = await Models.bills.findOne({
      attributes: ["bill_type"],
      where: { id: bill_id },
      include: {
        model: Models.transactions,
        attributes: [],
        where: { [Op.or]: [{ status: "Process" }, { status: "Success" }] },
      },
    });

    if (getServiceType === null) return null;

    if (getServiceType.dataValues.bill_type === "Listrik-Token")
      return getTokenReceipt(billId);

    if (getServiceType.dataValues.bill_type === "Listrik-Tagihan")
      return getPlnTagihanReceipt(billId);

    if (
      getServiceType.dataValues.bill_type === "Mobile-Pulsa" ||
      getServiceType.dataValues.bill_type === "Mobile-Internet"
    )
      return getMobileReceipt(billId);

    if (getServiceType.dataValues.bill_type === "Landline")
      return getLandlineReceipt(billId);

    if (getServiceType.dataValues.bill_type === "Internet-TV")
      return getInternetTvReceipt(billId);

    if (getServiceType.dataValues.bill_type === "PDAM")
      return getPdamReceipt(billId);

    if (getServiceType.dataValues.bill_type === "BPJS")
      return getBpjsReceipt(bill_id);

    return null;
  } catch (error) {
    return error.message;
  }
};

const getTokenReceipt = async (billId) => {
  try {
    const tokenReceipt = await Models.pln_token_bills.findOne({
      where: { bill_id: billId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const recurring = await getReccuringBill(billId);

    return {
      receipt: tokenReceipt,
      recurring,
    };
  } catch (error) {
    return error.message;
  }
};

const getPlnTagihanReceipt = async (billId) => {
  try {
    const plnTagihanReceipt = await Models.pln_tagihan_bills.findOne({
      where: { bill_id: billId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const recurring = await getReccuringBill(billId);

    return {
      receipt: plnTagihanReceipt,
      recurring,
    };
  } catch (error) {
    return error.message;
  }
};

const getMobileReceipt = async (billId) => {
  try {
    const mobileReceipt = await Models.mobile_bills.findOne({
      where: { bill_id: billId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const recurring = await getReccuringBill(billId);

    return {
      receipt: mobileReceipt,
      recurring,
    };
  } catch (error) {
    return error.message;
  }
};

const getLandlineReceipt = async (billId) => {
  try {
    const landlineReceipt = await Models.landline_bills.findOne({
      where: { bill_id: billId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const recurring = await getReccuringBill(billId);

    return {
      receipt: landlineReceipt,
      recurring,
    };
  } catch (error) {
    return error.message;
  }
};

const getInternetTvReceipt = async (billId) => {
  try {
    const internetTvReceipt = await Models.internet_tv_bills.findOne({
      where: { bill_id: billId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const recurring = await getReccuringBill(billId);

    return {
      receipt: internetTvReceipt,
      recurring,
    };
  } catch (error) {
    return error.message;
  }
};

const getPdamReceipt = async (billId) => {
  try {
    const pdamReceipt = await Models.pdam_bills.findOne({
      where: { bill_id: billId },
      attributes: { exclude: ["createdAt", "updatedAt", "ppn", "stamp_cost"] },
    });

    pdamReceipt.dataValues.period = [pdamReceipt.dataValues.period];

    if (pdamReceipt.total_month > 1) {
      let periodList = [];

      for (let i = 0; i < pdamReceipt.total_month; i++) {
        let pdamPeriod = new Date(pdamReceipt.period);
        pdamPeriod.setMonth(pdamPeriod.getMonth() - i);
        periodList.push(pdamPeriod);
      }

      pdamReceipt.dataValues.period = periodList;
    }

    const recurring = await getReccuringBill(billId);

    return {
      receipt: pdamReceipt,
      recurring,
    };
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

    bpjsReceipt.dataValues.payment_period = [
      bpjsReceipt.dataValues.payment_period,
    ];

    if (bpjsReceipt.total_month > 1) {
      let periodList = [];

      for (let i = 0; i <= bpjsReceipt.total_month; i++) {
        let bpjsPeriod = new Date(bpjsReceipt.payment_period);
        bpjsPeriod.setMonth(bpjsPeriod.getMonth() - i);
        periodList.push(bpjsPeriod);
      }

      bpjsReceipt.dataValues.payment_period = periodList;
    }

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
        exclude: ["createdAt", "updatedAt", "is_delete"],
      },
    });

    return recurringBill;
  } catch (error) {
    return error.message;
  }
};
