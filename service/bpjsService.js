const Models = require("../database/models");
const paymentService = require("../service/paymentService");

exports.getCustomerInfo = async (vaNumber) => {
  try {
    const accountInfo = await Models.Bpjss.findOne({
      where: { va_number: vaNumber },
    });

    if (accountInfo === null) return null;

    let period;
    const lastPeriod = await findLastBill(vaNumber);

    let countMonth = 0;
    if (lastPeriod === null) {
      period = `${new Date().getFullYear()}-${new Date().getMonth()}-10`;
    } else {
      countMonth = await monthDiff(lastPeriod, new Date());
      if (countMonth === 1 && dayDiff(lastPeriod, new Date()) > 1) return 202;
      if (
        countMonth === 1 ||
        (countMonth === 0 && dayDiff(lastPeriod, new Date()) <= 31)
      )
        period = `${new Date().getFullYear()}-${new Date().getMonth()}-10`;
    }

    let bill = await (accountInfo.cost * accountInfo.family_member);

    return {
      noVa: accountInfo.va_number,
      fullName: accountInfo.name,
      branch: accountInfo.branch,
      familyMember: accountInfo.family_member,
      period,
      countMonth: countMonth === 0 ? countMonth + 1 : countMonth,
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
    const findCustomer = await Models.Bpjss.findOne({
      where: { va_number: requestData.vaNumber },
    });

    if (findCustomer === null) return 204;

    const period = new Date(requestData.period);
    const isPay = monthDiff(period, new Date());

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

    const lastPeriod = await findLastBill(requestData.vaNumber);

    if (lastPeriod !== null) {
      if (lastPeriod.getTime() === period.getTime()) {
        console.log("Ok");
        return {
          isActive: true,
          isPay: false,
          message: "This Service Already Paid",
        };
      }
    }

    if (
      (isPay === 1 && new Date().getDate() < 10) ||
      (isPay === 0 && new Date().getDate() < 10)
    ) {
      const createBill = await Models.bills.create({
        user_id: userId,
        bill_type: "BPJS",
      });

      const createBpjsBill = await Models.bpjs_bills.create({
        bill_id: createBill.id,
        va_number: requestData.vaNumber,
        full_name: requestData.fullName,
        branch: requestData.branch,
        payment_period: period,
        bill_fee: requestData.bill,
        admin_fee: requestData.adminFee,
        total: requestData.total,
      });

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
          const createRecurringBilling = await Models.recurring_billings.create(
            {
              bill_id: createBill.id,
              period: requestData.recurringBilling.period,
              date_billed: recurringDate,
              due_date: new Date(),
            }
          );
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
        payment: { transactionId: createTransaction.id, ...payBill },
        noVa: requestData.vaNumber,
        fullName: requestData.fullName,
        branch: requestData.branch,
        familyMember: requestData.familyMember,
        paymentPeriod: period,
        billFee: requestData.bill,
        adminFee: requestData.adminFee,
        total: requestData.total,
        notificationMessage: "Payment Created",
      };
    } else {
      return 202;
    }
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
  const diffTime = Math.abs(d2 - d1);
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
