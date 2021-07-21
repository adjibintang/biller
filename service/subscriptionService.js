const { x } = require("joi");
const Models = require("../database/models");
const receiptService = require("../service/receiptService");

exports.getOngoingPurchase = async (userId) => {
  try {
    const ongoingBillList = await findOngoingBills(userId);
    const billDetail = await findDetails(
      ongoingBillList.map((x) => x.dataValues)
    );

    let ongoingTotal = 0;
    billDetail.forEach((element) => {
      ongoingTotal += element.total;
    });

    return { billList: [...billDetail], total: ongoingTotal };
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

exports.getActiveSubscription = async (userId) => {
  try {
    const recurringBillList = await findRecurringBill(userId);

    return { billList: [...recurringBillList] };
  } catch (error) {
    return error.message;
  }
};

const findRecurringBill = async (userId) => {
  try {
    const billList = await Models.recurring_billings.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "is_delete"] },
      include: {
        model: Models.bills,
        attributes: ["bill_type"],
        where: { user_id: userId },
        group: "period",
        required: true,
        include: {
          model: Models.transactions,
          attributes: [],
          where: { status: "Success" },
          required: true,
        },
      },
    });

    return billList;
  } catch (error) {
    return error.message;
  }
};

const findOngoingBills = async (userId) => {
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
    return error.message;
  }
};

const findDetails = async (billList) => {
  try {
    let billDetails = [];

    for (let i = 0; i < billList.length; i++) {
      if (billList[i].bill_type === "Listrik-Token") {
        const result = await tokenDetail(billList[i].id);
        billDetails.push(result);
      }

      if (billList[i].bill_type === "Listrik-Tagihan") {
        const result = await tagihanDetail(billList[i].id);
        billDetails.push(result);
      }

      if (billList[i].bill_type === "Mobile-Pulsa") {
        const result = await mobileDetail(billList[i].id, "Pulsa");
        billDetails.push(result);
      }

      if (billList[i].bill_type === "Mobile-Internet") {
        const result = await mobileDetail(billList[i].id, "Internet");
        billDetails.push(result);
      }

      if (billList[i].bill_type === "Landline") {
        const result = await landlineDetail(billList[i].id);
        billDetails.push(result);
      }

      if (billList[i].bill_type === "Internet-TV") {
        const result = await internetTvDetail(billList[i].id);
        billDetails.push(result);
      }

      if (billList[i].bill_type === "PDAM") {
        const result = await pdamDetail(billList[i].id);
        billDetails.push(result);
      }

      if (billList[i].bill_type === "BPJS") {
        const result = await bpjsDetail(billList[i].id);
        billDetails.push(result);
      }
    }

    return billDetails;
  } catch (error) {
    return error.message;
  }
};

const tokenDetail = async (billId) => {
  try {
    const detail = await Models.pln_token_bills.findOne({
      where: { bill_id: billId },
    });

    return {
      type: "PLN - Token",
      customerNumber: detail.dataValues.meter_number,
      total: parseInt(detail.dataValues.total),
    };
  } catch (error) {
    return error.message;
  }
};

const tagihanDetail = async (billId) => {
  try {
    const detail = await Models.pln_tagihan_bills.findOne({
      where: { bill_id: billId },
    });

    return {
      type: "PLN - Tagihan",
      customerNumber: detail.dataValues.customer_number,
      total: parseInt(detail.dataValues.total),
    };
  } catch (error) {
    return error.message;
  }
};

const mobileDetail = async (billId, type) => {
  try {
    const detail = await Models.mobile_bills.findOne({
      where: { bill_id: billId },
    });

    return {
      type: `${type} - ${detail.dataValues.provider}`,
      customerNumber: detail.dataValues.phone_number,
      total: parseInt(detail.dataValues.total),
    };
  } catch (error) {
    return error.message;
  }
};

const landlineDetail = async (billId) => {
  try {
    const detail = await Models.landline_bills.findOne({
      where: { bill_id: billId },
    });

    return {
      type: `Landline`,
      customerNumber: detail.dataValues.phone_number,
      total: parseInt(detail.dataValues.total),
    };
  } catch (error) {
    return error.message;
  }
};

const internetTvDetail = async (billId) => {
  try {
    const detail = await Models.internet_tv_bills.findOne({
      where: { bill_id: billId },
    });

    return {
      type: `Internet TV - ${detail.dataValues.provider}`,
      customerNumber: detail.dataValues.customer_number,
      total: parseInt(detail.dataValues.total),
    };
  } catch (error) {
    return error.message;
  }
};

const pdamDetail = async (billId) => {
  try {
    const detail = await Models.pdam_bills.findOne({
      where: { bill_id: billId },
    });

    return {
      type: `PDAM`,
      customerNumber: detail.dataValues.customer_number,
      total: parseInt(detail.dataValues.total),
    };
  } catch (error) {
    return error.message;
  }
};

const bpjsDetail = async (billId) => {
  try {
    const detail = await Models.bpjs_bills.findOne({
      where: { bill_id: billId },
    });

    return {
      type: `BPJS`,
      customerNumber: detail.dataValues.va_number,
      total: parseInt(detail.dataValues.total),
    };
  } catch (error) {
    return error.message;
  }
};
