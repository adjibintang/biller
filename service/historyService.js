const Models = require("../database/models");
const moment = require("moment");
const { array } = require("joi");

exports.getAllHistory = async (user_id) => {
  const findAllBillId = await Models.bills.findAll({
    attributes: ["id", "bill_type"],
    where: { user_id },
    include: {
      model: Models.transactions,
      attributes: [],
      where: { status: "Success" },
    },
  });

  if (findAllBillId.length == 0) return null;

  const result = [];

  for (let i = 0; i < findAllBillId.length; i++) {
    if (findAllBillId[i].bill_type === "Listrik-Token") {
      const listrikTokenBill = await Models.bills.findOne({
        where: { id: findAllBillId[i].id },
        attributes: ["id", "bill_type"],
        include: [
          {
            model: Models.pln_token_bills,
            attributes: ["customer_number", "total"],
          },
          { model: Models.transactions, attributes: ["updatedAt"] },
        ],
      });

      result.push({
        bill_id: listrikTokenBill.id,
        bill_type: listrikTokenBill.bill_type,
        customer_number: listrikTokenBill.pln_token_bill.customer_number,
        total: listrikTokenBill.pln_token_bill.total,
        transaction_date: moment(listrikTokenBill.transaction.updatedAt).format(
          "ll"
        ),
      });
    }

    if (findAllBillId[i].bill_type === "Listrik-Tagihan") {
      const listrikTagihanBill = await Models.bills.findOne({
        where: { id: findAllBillId[i].id },
        attributes: ["id", "bill_type"],
        include: [
          {
            model: Models.pln_tagihan_bills,
            attributes: ["customer_number", "total"],
          },
          {
            model: Models.transactions,
            attributes: ["updatedAt"],
            where: { status: "Success" },
          },
        ],
      });

      result.push({
        bill_id: listrikTagihanBill.id,
        bill_type: listrikTagihanBill.bill_type,
        customer_number: listrikTagihanBill.pln_tagihan_bill.customer_number,
        total: listrikTagihanBill.pln_tagihan_bill.total,
        transaction_date: moment(
          listrikTagihanBill.transaction.updatedAt
        ).format("ll"),
      });
    }

    if (
      findAllBillId[i].bill_type === "Mobile-Internet" ||
      findAllBillId[i].bill_type === "Mobile-Pulsa" ||
      findAllBillId[i].bill_type === "Mobile-Pasca"
    ) {
      console.log("test");
      const mobileBill = await Models.bills.findOne({
        where: { id: findAllBillId[i].id },
        attributes: ["id", "bill_type"],
        include: [
          {
            model: Models.mobile_bills,
            attributes: ["phone_number", "provider", "total"],
          },
          { model: Models.transactions, attributes: ["updatedAt"] },
        ],
      });

      if (mobileBill) {
        result.push({
          bill_id: mobileBill.id,
          bill_type: mobileBill.bill_type,
          customer_number: mobileBill.mobile_bill.phone_number,
          provider: mobileBill.mobile_bill.provider,
          total: mobileBill.mobile_bill.total,
          transaction_date: moment(mobileBill.transaction.updatedAt).format(
            "ll"
          ),
        });
      }
    }

    if (findAllBillId[i].bill_type === "Internet-TV") {
      const internetTVBill = await Models.bills.findOne({
        where: { id: findAllBillId[i].id },
        attributes: ["id", "bill_type"],
        include: [
          {
            model: Models.internet_tv_bills,
            attributes: ["customer_number", "provider", "total"],
          },
          { model: Models.transactions, attributes: ["updatedAt"] },
        ],
      });

      result.push({
        bill_id: internetTVBill.id,
        bill_type: internetTVBill.bill_type,
        customer_number: internetTVBill.internet_tv_bills[0].customer_number,
        provider: internetTVBill.internet_tv_bills[0].provider,
        total: internetTVBill.internet_tv_bills[0].total,
        transaction_date: moment(internetTVBill.transaction.updatedAt).format(
          "ll"
        ),
      });
    }

    if (findAllBillId[i].bill_type === "Landline") {
      const landlineBill = await Models.bills.findOne({
        where: { id: findAllBillId[i].id },
        attributes: ["id", "bill_type"],
        include: [
          {
            model: Models.landline_bills,
            attributes: ["phone_number", "total"],
          },
          { model: Models.transactions, attributes: ["updatedAt"] },
        ],
      });

      result.push({
        bill_id: landlineBill.id,
        bill_type: landlineBill.bill_type,
        customer_number: landlineBill.landline_bill.phone_number,
        total: landlineBill.landline_bill.total,
        transaction_date: moment(landlineBill.transaction.updatedAt).format(
          "ll"
        ),
      });
    }

    if (findAllBillId[i].bill_type === "PDAM") {
      const pdamBill = await Models.bills.findOne({
        where: { id: findAllBillId[i].id },
        attributes: ["id", "bill_type"],
        include: [
          {
            model: Models.pdam_bills,
            attributes: ["customer_number", "total"],
          },
          { model: Models.transactions, attributes: ["updatedAt"] },
        ],
      });

      result.push({
        bill_id: pdamBill.id,
        bill_type: pdamBill.bill_type,
        customer_number: pdamBill.pdam_bills[0].customer_number,
        total: pdamBill.pdam_bills[0].total,
        transaction_date: moment(pdamBill.transaction.updatedAt).format("ll"),
      });
    }

    if (findAllBillId[i].bill_type === "BPJS") {
      const bpjsBill = await Models.bills.findOne({
        where: { id: findAllBillId[i].id },
        attributes: ["id", "bill_type"],
        include: [
          {
            model: Models.bpjs_bills,
            attributes: ["va_number", "total"],
          },
          { model: Models.transactions, attributes: ["updatedAt"] },
        ],
      });

      result.push({
        bill_id: bpjsBill.id,
        bill_type: bpjsBill.bill_type,
        customer_number: bpjsBill.bpjs_bill.va_number,
        total: bpjsBill.bpjs_bill.total,
        transaction_date: moment(bpjsBill.transaction.updatedAt).format("ll"),
      });
    }
  }

  const sortHistory = result.sort((a, b) => {
    let dateA = new Date(a.transaction_date).getTime();
    let dateB = new Date(b.transaction_date).getTime();
    return dateA > dateB ? 1 : -1;
  });

  return sortHistory;
};

exports.filterHistory = async (array, parameter) => {
  let result;
  const filter = parameter.split("&");
  if (filter.includes("last3Month")) {
    result = await filterLast3Month(array);
  } else if (filter.includes("lastMonth")) {
    result = await filterLastMonth(array);
  } else if (filter.includes("lastWeek")) {
    result = await filterLastWeek(array);
  } else if (filter.includes("today")) {
    result = await filterToday(array);
  }
  return result;
};

exports.groupTransactionDate = async (array) => {
  result = array.reduce(function (r, a) {
    r[a.transaction_date] = r[a.transaction_date] || [];
    r[a.transaction_date].push(a);
    return r;
  }, Object.create(null));

  let keys = Object.keys(result);
  let values = Object.values(result);

  const arr = keys.map((value, index) => ({ [value]: values[index] }));

  return arr;
};

const filterToday = async (array) => {
  const today = moment().format("ll");
  const result = array.filter((x) => x.transaction_date == today);
  return result;
};

const filterLastWeek = async (array) => {
  const lastWeek = moment().subtract(7, "days");
  const result = array.filter((x) =>
    moment(x.transaction_date).isBetween(lastWeek, moment())
  );
  return result;
};

const filterLastMonth = async (array) => {
  const lastMonth = moment().subtract(1, "month");
  const result = array.filter((x) =>
    moment(x.transaction_date).isBetween(lastMonth, moment())
  );
  return result;
};

const filterLast3Month = async (array) => {
  const last3Month = moment().subtract(3, "month");
  const result = array.filter((x) =>
    moment(x.transaction_date).isBetween(last3Month, moment())
  );
  return result;
};
