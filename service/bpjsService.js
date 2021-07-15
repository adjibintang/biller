const Models = require("../database/models");
const paymentService = require("../service/paymentService");

exports.getPeriod = async () => {
  try {
    let now = new Date();
    let period = [];
    for (let i = 1; i <= 12; i++) {
      now.setMonth(now.getMonth() + i - 1);
      period.push({
        period: now,
        month: i,
      });
      now = new Date();
    }
    return period;
  } catch (error) {
    return error.message;
  }
};
exports.getCustomerInfo = async (vaNumber, month, userPin) => {
  try {
    const accountInfo = await Models.Bpjss.findOne({
      where: { va_number: vaNumber },
    });

    if (accountInfo === null) return null;

    let period = [];

    let now = new Date();
    for (let i = 0; i < month; i++) {
      now.setMonth(now.getMonth() + i + 1);
      period.push(`${now.getFullYear()}-${now.getMonth()}-10`);
      now = new Date();
    }

    const lastPeriod = await findLastBill(vaNumber);
    let howMany;

    if (lastPeriod === null) {
      howMany = period.length;
    } else {
      const dayDifference = dayDiff(lastPeriod, new Date(period[0]));
      if (
        (dayDifference > 1 && new Date().getDate() > 10) ||
        (dayDifference === 0 && new Date().getDate() > 10)
      )
        return {
          isActive: false,
          isPay: false,
          message:
            "Your Account is Disabled, Please Contact The Office For Further Information",
        };

      if (
        lastPeriod.getTime() ===
          new Date(period[period.length - 1]).getTime() ||
        lastPeriod.getTime() >= new Date(period[period.length - 1]).getTime()
      )
        return "Already Paid";

      howMany =
        new Date(period[period.length - 1]).getMonth() +
        1 -
        (lastPeriod.getMonth() + 1);
    }

    let bill = await (accountInfo.cost * accountInfo.family_member * howMany);

    return {
      pin: userPin,
      noVa: accountInfo.va_number,
      fullName: accountInfo.name,
      branch: accountInfo.branch,
      familyMember: accountInfo.family_member,
      period,
      countMonth: period.length,
      bill,
      adminFee: 2500,
      total: bill + 2500,
    };
  } catch (error) {
    return error;
  }
};

exports.newBill = async (requestData, userId) => {
  try {
    const lastPeriod = await findLastBill(requestData.vaNumber);
    const period = requestData.period;

    let howMany = period.length;
    if (lastPeriod !== null) {
      howMany =
        new Date(period[period.length - 1]).getMonth() +
        1 -
        (lastPeriod.getMonth() + 1);
      const dayDifference = dayDiff(lastPeriod, new Date(period[0]));
      if (dayDifference > 1 && new Date().getDate() > 10)
        return {
          isActive: false,
          isPay: false,
          message:
            "Your Account is Disabled, Please Contact The Office For Further Information",
        };

      if (dayDifference === 0 && new Date().getDate() > 10)
        return {
          isActive: true,
          isPay: false,
          message: "This Service Already Paid",
        };
    }

    if (
      (requestData.recurringBilling.status === true &&
        requestData.recurringBilling.period !== "Month") ||
      (requestData.recurringBilling.period === "Month" &&
        new Date(requestData.recurringBilling.createDate).getDate() > 10)
    ) {
      return {
        isActive: true,
        isPay: false,
        message: "This Service Can Only Be Paid Monthly Before 10th",
      };
    }

    const createBill = await Models.bills.create({
      user_id: userId,
      bill_type: "BPJS",
    });

    const createBpjsBill = await Models.bpjs_bills.create({
      bill_id: createBill.id,
      va_number: requestData.vaNumber,
      full_name: requestData.fullName,
      branch: requestData.branch,
      payment_period: new Date(period[period.length - 1]),
      total_month: howMany,
      bill_fee: requestData.bill,
      admin_fee: requestData.adminFee,
      total: requestData.total,
    });

    const createTransaction = await Models.transactions.create({
      bill_id: createBill.id,
      transaction_date: new Date(),
    });

    let recurringBill = null;

    if (requestData.recurringBilling.status === true) {
      let recurringDate = await getRecurringDate(
        requestData.recurringBilling.period,
        new Date(requestData.recurringBilling.createDate),
        requestData.recurringBilling.day
          ? requestData.recurringBilling.day
          : null
      );

      const lastRecurringBill = await getLastRecurringBill(createBill.id);

      if (lastRecurringBill === null) {
        recurringBill = await Models.recurring_billings.create({
          bill_id: createBill.id,
          period: requestData.recurringBilling.period,
          date_billed: recurringDate,
          due_date: null,
        });
      } else {
        recurringBill = await Models.recurring_billings.update(
          {
            period: requestData.recurringBilling.period,
            date_billed: recurringDate,
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
        recurringDate,
      };
    }

    let payBill;
    if (requestData.payment.type === "Bank Transfer") {
      payBill = await paymentService.payNewBill(
        createTransaction.id,
        requestData.payment.type,
        requestData.payment.bankDestinationId
      );
    }

    return {
      isActive: true,
      isPay: true,
      billId: createBill.id,
      paymentDetail: { transactionId: createTransaction.id, ...payBill },
      billDetail: {
        noVa: requestData.vaNumber,
        fullName: requestData.fullName,
        branch: requestData.branch,
        familyMember: requestData.familyMember,
        paymentPeriod: period,
        billFee: requestData.bill,
        adminFee: requestData.adminFee,
        total: requestData.total,
      },
      recurringDetail,
      notificationMessage: "Payment Created",
    };
  } catch (error) {
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

const findLastBill = async (vaNumber) => {
  try {
    const lastBill = await Models.bpjs_bills.findOne({
      attributes: ["payment_period"],
      where: { va_number: vaNumber },
      order: [["payment_period", "DESC"]],
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

    return lastBill.dataValues.payment_period;
  } catch (error) {
    return error.message;
  }
};

const dayDiff = (d1, d2) => {
  const diffTime = Math.abs(new Date(d2) - new Date(d1));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

const monthDiff = (d1, d2) => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

const getRecurringDate = async (period, date, day) => {
  try {
    let reccuringDate;
    if (period === "Year") recurringDate = await getDateOfNextYear(date);

    if (period === "Month") recurringDate = await getDateOfNextMonth(date);

    if (period === "Week") recurringDate = await getNextDayOfWeek(date, day);

    return recurringDate;
  } catch (error) {
    return error.message;
  }
};

const getNextDayOfWeek = async (date, dayOfWeek) => {
  const dayDiff = 6 - date.getDay();
  date.setDate(date.getDate() + dayDiff + dayOfWeek + 1);
  date.setMonth(date.getMonth() + 1);
  const result = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  return result;
};

const getDateOfNextMonth = async (date) => {
  date.setMonth(date.getMonth() + 2);
  const result = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  return result;
};

const getDateOfNextYear = async (date) => {
  date.setYear(date.getFullYear() + 1);
  date.setMonth(date.getMonth() + 1);
  const result = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  return result;
};
