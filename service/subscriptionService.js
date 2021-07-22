const Models = require("../database/models");
const receiptService = require("../service/receiptService");
const moment = require("moment");

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
    return error.message;
  }
};

exports.getActiveSubscription = async (userId) => {
  try {
    const recurringBillList = await findRecurringBill(userId);
    const filterByDate = await groupByDate(recurringBillList.map((x) => x));

    return filterByDate;
  } catch (error) {
    return error.message;
  }
};

exports.cancelSubscription = async (billsId) => {
  try {
    for (let i = 0; i <= billsId.length; i++) {
      const findSubscription = await Models.recurring_billings.findOne({
        where: { bill_id: billsId[i] },
      });

      if (findSubscription === null) return 404;

      const sotfDelete = await Models.recurring_billings.update(
        {
          is_delete: true,
        },
        { where: { bill_id: billsId[i] } }
      );
    }

    return;
  } catch (error) {
    return error.message;
  }
};

const findRecurringBill = async (userId) => {
  try {
    const billList = await Models.recurring_billings.findAll({
      attributes: [["id", "recurringId"], "bill_id", "period", "date_billed"],
      where: { is_delete: false },
      include: {
        model: Models.bills,
        attributes: ["bill_type"],
        where: { user_id: userId },
        required: true,
        include: {
          model: Models.transactions,
          attributes: [],
          where: { status: "Success" },
          required: true,
        },
      },
    });

    let result = [];

    billList.forEach((element) => {
      result.push({
        recurringId: element.dataValues.recurringId,
        id: element.dataValues.bill_id,
        bill_type: element.dataValues.bill.dataValues.bill_type,
        period: element.dataValues.period,
        dateBilled: element.dataValues.date_billed,
      });
    });

    return result;
  } catch (error) {
    return error.message;
  }
};

const groupByDate = async (billList) => {
  try {
    let resultWeek = [];
    let resultMonth = [];
    let resultYear = [];

    const detail = await findDetails(billList);

    for (let i = 0; i < billList.length; i++) {
      if (billList[i].period === "Week") {
        const detail = await findDetails(billList);

        resultWeek.push({
          recurringId: billList[i].recurringId,
          billId: billList[i].id,
          type: detail[i].type,
          customerNumber: detail[i].customerNumber,
          total: detail[i].total,
          bill_type: billList[i].billType,
          period: billList[i].period,
          dateBilled: moment(billList[i].dateBilled).format("YYYY-MM-DD"),
        });
      }
      if (billList[i].period === "Month") {
        const detail = await findDetails(billList);

        resultMonth.push({
          recurringId: billList[i].recurringId,
          billId: billList[i].id,
          type: detail[i].type,
          customerNumber: detail[i].customerNumber,
          total: detail[i].total,
          bill_type: billList[i].billType,
          period: billList[i].period,
          dateBilled: moment(billList[i].dateBilled).format("YYYY-MM-DD"),
        });
      }
      if (billList[i].period === "Year") {
        const detail = await findDetails(billList);
        resultYear.push({
          recurringId: billList[i].recurringId,
          billId: billList[i].id,
          type: detail[i].type,
          customerNumber: detail[i].customerNumber,
          total: detail[i].total,
          bill_type: billList[i].billType,
          period: billList[i].period,
          dateBilled: moment(billList[i].dateBilled).format("YYYY-MM-DD"),
        });
      }
    }

    a = resultWeek.reduce(function (r, a) {
      r[a.dateBilled] = r[a.dateBilled] || [];
      r[a.dateBilled].push(a);
      return r;
    }, Object.create(null));

    let subscription = {};

    subscription.late = a;

    b = resultMonth.reduce(function (r, a) {
      r[a.dateBilled] = r[a.dateBilled] || [];
      r[a.dateBilled].push(a);
      return r;
    }, Object.create(null));

    c = resultYear.reduce(function (r, a) {
      r[a.dateBilled] = r[a.dateBilled] || [];
      r[a.dateBilled].push(a);
      return r;
    }, Object.create(null));

    let week = {};

    let weekTempLate = [];
    let weekTempPay = [];
    let weekTempPlaned = [];

    for (i in a) {
      for (j in i) {
        if (a[i][j] === undefined) continue;

        let now = moment();
        let billedDate = moment(a[i][j].dateBilled);

        const dayDiff = now.diff(billedDate, "days");

        if (dayDiff >= 1) weekTempLate.push(a[i][j]);

        if (dayDiff > -5) weekTempPay.push(a[i][j]);

        if (dayDiff < -5) weekTempPlaned.push(a[i][j]);
      }

      week.late = weekTempLate;
      week.pay = weekTempPay;
      week.planed = weekTempPlaned;
    }

    let month = {};

    let monthTempLate = [];
    let monthTempPay = [];
    let monthTempPlaned = [];

    for (i in b) {
      for (j in i) {
        if (b[i][j] === undefined) continue;

        let now = moment();
        let billedDate = moment(a[i][j].dateBilled);

        const dayDiff = now.diff(billedDate, "days");

        if (dayDiff >= 1) monthTempLate.push(b[i][j]);

        if (dayDiff > -5) monthTempPay.push(b[i][j]);

        if (dayDiff < -5) monthTempPlaned.push(b[i][j]);
      }
      month.late = monthTempLate;
      month.pay = monthTempPay;
      month.planed = monthTempPlaned;
    }

    let year = {};

    let yearTempLate = [];
    let yearTempPay = [];
    let yearTempPlaned = [];

    for (i in c) {
      for (j in i) {
        if (c[i][j] === undefined) continue;

        let now = moment();
        let billedDate = moment(a[i][j].dateBilled);

        const dayDiff = now.diff(billedDate, "days");

        if (dayDiff >= 1) yearTempLate.push(c[i][j]);

        if (dayDiff > -5) yearTempPay.push(c[i][j]);

        if (dayDiff < -5) yearTempPlaned.push(c[i][j]);
      }
      year.late = yearTempLate;
      year.pay = yearTempPay;
      year.planed = yearTempPlaned;
    }

    return [{ week }, { month }, { year }];
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

      if (billList[i].bill_type === "Mobile-Pasca") {
        const result = await mobileDetail(billList[i].id, "Pasca Bayar");
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
