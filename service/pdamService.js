const Models = require("../database/models");
const paymentService = require("../service/paymentService");
const { Op } = require("sequelize");

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

exports.getCustomerInfo = async (customerNumber) => {
  try {
    const accountInfo = await findPdamCustomer(customerNumber);

    if (accountInfo === null) return null;

    let period = [];
    const lastPeriod = await findLastBill(customerNumber);

    let countMonth = 0;
    if (lastPeriod === null) {
      period.push(
        `${new Date().getFullYear()}-${new Date().getMonth() - 1}-20`
      );
    } else {
      countMonth = await monthDiff(lastPeriod, new Date());
    }

    if (countMonth !== 0) {
      for (let i = 1; i < countMonth; i++) {
        period.push(
          `${new Date().getFullYear()}-${new Date().getMonth() - i}-20`
        );
      }
    }

    const latePaymentFee = await getLatePaymentFee(customerNumber);

    let usage =
      accountInfo.this_month_stand_meter - accountInfo.last_month_stand_meter;
    let bill = usage * parseFloat(accountInfo.fixed_cost);
    let total = bill + 2500 + latePaymentFee;

    const accountInfoResponse = {
      id: accountInfo.id,
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
    const findCustomer = await findPdamCustomer(requestData.customerNumber);
    if (findCustomer === null) return null;

    const accountStatus = await isActive(requestData.customerNumber);
    if (accountStatus === false)
      return {
        isActive: false,
        message: "PDAM Account Disabled, Please Contact The Office",
      };

    if ((await getLatePaymentFee(requestData.customerNumber)) === false)
      return { isActive: true, isPay: false, message: "Not Time To Pay" };

    if (
      (requestData.recurringBilling.status === true &&
        requestData.recurringBilling.period !== "Month") ||
      (requestData.recurringBilling.period === "Month" &&
        new Date(requestData.recurringBilling.createDate).getDate() < 20)
    ) {
      return {
        isActive: true,
        isPay: false,
        message: "This Service Can Only Be Paid Monthly On 20th To 25th",
      };
    }

    const createBill = await Models.bills.create({ user_id: userId });

    for (let i = 0; i < requestData.period.length; i++) {
      const createPdamBill = await Models.pdam_bills.create({
        bill_id: createBill.id,
        customer_number: requestData.customerNumber,
        name: requestData.name,
        period: new Date(requestData.period[i]),
        last_month_stand_meter: requestData.lastMonthStandMeter,
        this_month_stand_meter: requestData.thisMonthStandMeter,
        usage: requestData.usage,
        bill_fee: requestData.billFee,
        ppn: 0,
        stamp_cost: 3000,
        late_payment_fee: requestData.latePaymentFee,
        admin_fee: requestData.adminFee,
        total: requestData.total,
      });
    }

    const createTransaction = await Models.transactions.create({
      bill_id: createBill.id,
      transaction_date: new Date(),
    });

    if (requestData.recurringBilling.status === true) {
      let recurringDate = await getReccuringDate(
        requestData.recurringBilling.period,
        new Date(requestData.recurringBilling.createDate)
      );

      const lastRecurringBill = await getLastRecurringBill(createBill.id);

      if (lastRecurringBill === null) {
        const createRecurringBilling = await Models.recurring_billings.create({
          bill_id: createBill.id,
          period: requestData.recurringBilling.period,
          date_billed: recurringDate,
          due_date: new Date(),
        });
      } else {
        const updateRecurringBill = await Models.recurring_billings.update(
          {
            period: requestData.recurringBilling.period,
            date_billed: recurringDate,
            due_date: new Date(),
          },
          {
            where: { id: lastRecurringBill.id },
          }
        );
      }
    }

    const payBill = await paymentService.payNewBill(
      createTransaction.id,
      requestData.payment.type,
      requestData.payment.bankDestinationId
    );

    return {
      payment: { transactionId: createTransaction.id, ...payBill },
      customer_number: requestData.customerNumber,
      name: requestData.name,
      period: [...requestData.period],
      last_month_stand_meter: requestData.lastMonthStandMeter,
      this_month_stand_meter: requestData.thisMonthStandMeter,
      usage: requestData.usage,
      bill_fee: requestData.billFee,
      late_payment_fee: requestData.latePaymentFee,
      admin_fee: requestData.adminFee,
      total: requestData.total,
      notificationMessage: "Payment Created",
    };
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const getLastRecurringBill = async (billId) => {
  try {
    console.log(billId);
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
    console.log(error);
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

const isActive = async (customerNumber) => {
  try {
    let lastBill = await findLastBill(customerNumber);
    if (lastBill === null) return true;

    const monthDifference = await monthDiff(lastBill, new Date());

    if (monthDifference > 3) return false;

    return true;
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
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

const getReccuringDate = async (period, date) => {
  try {
    let reccuringDate;
    if (period === "Year")
      recurringDate = `${date.getFullYear() + 1}-${
        date.getMonth() + 1
      }-${date.getDate()}`;

    if (period === "Month")
      recurringDate = `${date.getFullYear()}-${
        date.getMonth() + 2
      }-${date.getDate()}`;

    if (period === "Week")
      recurringDate = await getNextDayOfWeek(date, date.getDay());

    return new Date(recurringDate);
  } catch (error) {
    return error.message;
  }
};

const getNextDayOfWeek = async (date, dayOfWeek) => {
  let resultDate = new Date(date.getTime());
  await resultDate.setDate(
    date.getDate() + ((7 + dayOfWeek - date.getDay() - 1) % 7) + 1
  );
  return resultDate;
};
