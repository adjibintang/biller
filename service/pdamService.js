const Models = require("../database/models");
const paymentService = require("../service/paymentService");
const { Op } = require("sequelize");
const dateService = require("moment");

exports.getCities = async () => {
  try {
    const citiesResponse = await Models.Cities.findAll({
      attributes: ["id", "name"],
    });

    return citiesResponse;
  } catch (error) {
    return null;
  }
};

exports.searchCity = async (param) => {
  try {
    const cityResponse = await Models.Cities.findAll({
      attributes: ["id", "name"],
      where: { name: { [Op.iLike]: `${param}%` } },
    });

    return cityResponse;
  } catch (error) {
    return null;
  }
};

exports.getCustomerInfo = async (customerNumber, userPin) => {
  try {
    const accountInfo = await findPdamCustomer(customerNumber);

    if (accountInfo === null) return null;

    let period = [];
    const lastPeriod = await findLastBill(customerNumber);

    let countMonth = 0;
    let latePaymentFee;

    if (lastPeriod === null) {
      let date = new Date();
      date.setMonth(date.getMonth());
      period.push(`${date.getFullYear()}-${date.getMonth()}-20`);
      date.getDate() > 25 ? (latePaymentFee = 15000) : (latePaymentFee = 0);
    } else {
      countMonth = await monthDiff(lastPeriod, new Date());
      latePaymentFee = await getLatePaymentFee(customerNumber);

      if (countMonth >= 3)
        return {
          status: 202,
          message:
            "Your PDAM Service Not Active, Please Contact The Office For Further Information",
        };

      if (countMonth === 0 && new Date().getDate() < 20)
        return {
          status: 202,
          message: "PDAM Service Already Paid",
        };

      for (let i = 0; i < countMonth; i++) {
        let date = new Date(lastPeriod);
        date.setMonth(date.getMonth() + 2 + i);
        period.push(
          `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        );
      }
    }

    let usage =
      accountInfo.this_month_stand_meter - accountInfo.last_month_stand_meter;
    let bill = usage * parseFloat(accountInfo.fixed_cost);
    let total = bill + 2500 + latePaymentFee;

    const accountInfoResponse = {
      pin: userPin,
      customerNumber: accountInfo.customer_number,
      name: accountInfo.name,
      period,
      lastMonthStandMeter: accountInfo.last_month_stand_meter,
      thisMonthStandMeter: accountInfo.this_month_stand_meter,
      usage,
      bill,
      latePaymentFee: latePaymentFee !== false ? latePaymentFee : 0,
      admin: 2500,
      total,
    };

    return accountInfoResponse;
  } catch (error) {
    return error.message;
  }
};

exports.postNewPdamBill = async (requestData, userId) => {
  try {
    if (
      (requestData.recurringBilling.status === true &&
        requestData.recurringBilling.period !== "Month") ||
      (requestData.recurringBilling.period === "Month" &&
        new Date(requestData.recurringBilling.createDate).getDate() < 20)
    ) {
      return {
        status: 202,
        message: "This Service Can Only Be Paid Monthly On 20th To 25th",
      };
    }

    const createBill = await Models.bills.create({
      user_id: userId,
      bill_type: "PDAM",
    });

    const createPdamBill = await Models.pdam_bills.create({
      bill_id: createBill.id,
      customer_number: requestData.customerNumber,
      name: requestData.name,
      period: new Date(requestData.period[requestData.period.length - 1]),
      total_month: requestData.period.length,
      last_month_stand_meter: requestData.lastMonthStandMeter,
      this_month_stand_meter: requestData.thisMonthStandMeter,
      usage: requestData.usage,
      bill_fee: requestData.bill,
      ppn: 0,
      stamp_cost: 0,
      late_payment_fee: requestData.latePaymentFee,
      admin_fee: requestData.adminFee,
      total: requestData.total,
    });

    const createTransaction = await Models.transactions.create({
      bill_id: createBill.id,
      transaction_date: new Date(),
    });

    let recurringBill = null;

    if (requestData.recurringBilling.status === true) {
      const lastRecurringBill = await getLastRecurringBill(createBill.id);

      let dueDate = new Date(requestData.recurringBilling.createDate);
      dueDate.setDate(20);

      if (lastRecurringBill === null) {
        recurringBill = await Models.recurring_billings.create({
          bill_id: createBill.id,
          period: requestData.recurringBilling.period,
          date_billed: requestData.recurringBilling.createDate,
          due_date: dueDate, // Temporary
        });
      } else {
        recurringBill = await Models.recurring_billings.update(
          {
            period: requestData.recurringBilling.period,
            date_billed: requestData.recurringBilling.createDate,
            due_date: dueDate, //Temporary
          },
          {
            where: { id: lastRecurringBill.id },
          }
        );
      }
    }

    let recurringDetail;
    if (recurringBill === null) {
      recurringDetail = {};
    } else {
      recurringDetail = {
        period: recurringBill.period,
        recurringDate: requestData.recurringBilling.createDate,
      };
    }

    const payBill = await paymentService.payNewBill(
      createTransaction.id,
      requestData.payment.type,
      requestData.payment.bankDestinationId
    );

    return {
      billId: createBill.id,
      paymentDetail: { transactionId: createTransaction.id, ...payBill },
      billDetail: {
        customer_number: requestData.customerNumber,
        name: requestData.name,
        period: [...requestData.period],
        last_month_stand_meter: requestData.lastMonthStandMeter,
        this_month_stand_meter: requestData.thisMonthStandMeter,
        usage: requestData.usage,
        bill_fee: requestData.bill,
        late_payment_fee: requestData.latePaymentFee,
        admin_fee: requestData.adminFee,
        total: requestData.total,
      },
      recurringDetail,
      paymentMessage: "Payment Created",
    };
  } catch (error) {
    return error.message;
  }
};

const getLastRecurringBill = async (billId) => {
  try {
    const lastRecurringBill = await Models.recurring_billings.findOne({
      where: { bill_id: billId },
      include: {
        model: Models.bills,
        attributes: [],
        include: {
          attributes: [],
          model: Models.transactions,
          where: { status: "Success" },
        },
      },
    });

    return lastRecurringBill;
  } catch (error) {
    return error.message;
  }
};

const findPdamCustomer = async (customerNumber) => {
  try {
    const accountInfo = await Models.Pdams.findOne({
      attributes: { exclude: ["createdAt", "updatedAt", "city_id"] },
      include: {
        model: Models.Cities,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      where: { customer_number: customerNumber },
    });

    if (accountInfo === null) return null;

    return accountInfo;
  } catch (error) {
    return error.message;
  }
};

const findLastBill = async (customerNumber) => {
  try {
    const lastBill = await Models.pdam_bills.findOne({
      attributes: ["period"],
      where: { customer_number: customerNumber },
      order: [["period", "DESC"]],
      include: {
        model: Models.bills,
        attributes: [],
        include: {
          attributes: [],
          model: Models.transactions,
          where: { status: "Success" },
        },
      },
    });

    if (lastBill === null) return null;

    return lastBill.dataValues.period;
  } catch (error) {
    return error.message;
  }
};

const getLatePaymentFee = async (customerNumber) => {
  try {
    const lastBill = await findLastBill(customerNumber);

    if (lastBill !== null) {
      const monthDifference = await monthDiff(lastBill, new Date());
      let result;
      if (monthDifference === 3) return (result = 15000 * 3);
      if (monthDifference === 2) return (result = 15000 * 2);
      if (monthDifference === 1) return (result = 15000);
      if (
        monthDifference === 1 &&
        new Date().getDate() >= 20 &&
        new Date().getDate() <= 25
      )
        return (result = 0);
      return false;
    }

    return 0;
  } catch (error) {
    return error.message;
  }
};

const monthDiff = (d1, d2) => {
  d1 = dateService(d1);
  d2 = dateService(d2);

  const difference = d2.diff(d1, "months");

  return difference;
};
