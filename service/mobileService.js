const Models = require("../database/models");
const paymentService = require("../service/paymentService");

exports.getMobileServices = async (serviceId) => {
  try {
    const getmobile = await Models.Options.findAll({
      where: { service_id: serviceId },
      attributes: [["id", "optionId"], "name", "image_url"],
    });

    return getmobile;
  } catch (error) {
    return error.message;
  }
};

exports.getProviders = async () => {
  try {
    const providers = await Models.Mobile_cards.findAll({
      attributes: ["id", "prefix", "name"],
      include: { model: Models.Mobile_providers, attributes: ["name"] },
    });

    let result = [];
    providers.map((data) =>
      result.push({
        id: data.dataValues.id,
        prefix: data.dataValues.prefix,
        provider: data.dataValues.Mobile_provider.dataValues.name,
        type: data.dataValues.name,
      })
    );

    return result;
  } catch (error) {
    return error.message;
  }
};

exports.getPriceList = async (optionId) => {
  try {
    const priceList = await Models.Option_prices.findAll({
      attributes: ["id", "provider", "package_name", "description"],
      where: { option_id: optionId },
      include: { model: Models.Prices, attributes: ["price"] },
    });

    let result = [];
    priceList.map((data) =>
      result.push({
        optionPriceId: data.dataValues.id,
        provider: data.dataValues.provider,
        price: parseInt(data.dataValues.Price.dataValues.price),
        packageName: data.dataValues.package_name,
        description: data.dataValues.description,
      })
    );

    return result;
  } catch (error) {
    return error.message;
  }
};

exports.getCustomerInfo = async (
  phoneNumber,
  optionPriceId,
  provider,
  optionId
) => {
  try {
    const csPhoneNumber = await Models.Mobiles.findOne({
      where: { phone_number: phoneNumber },
      attributes: ["phone_number"],
    });

    if (csPhoneNumber === null) return null;

    const price = await Models.Option_prices.findOne({
      where: { id: optionPriceId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: { model: Models.Prices, attributes: ["price"] },
    });

    const adminFee = optionId == 5 ? 0 : 1500;

    return {
      phoneNumber: csPhoneNumber.phone_number,
      provider,
      priceDetail: {
        price: parseInt(price.dataValues.Price.price),
        packageName: price.package_name,
        description: price.description,
      },
      admin: adminFee,
      total: adminFee + parseInt(price.dataValues.Price.price),
    };
  } catch (error) {
    return error.message;
  }
};

exports.newBill = async (requestData, userId) => {
  try {
    const createBill = await Models.bills.create({
      user_id: userId,
      bill_type: "Mobile",
    });

    const createMobileBill = await Models.mobile_bills.create({
      bill_id: createBill.id,
      phoneNumber: requestData.phoneNumber,
      provider: requestData.provider,
      packageName: requestData.packageName ? requestData.packageName : null,
      description: requestData.description ? requestData.description : null,
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
      let recurringDate = new Date(requestData.recurringBilling.createDate);

      const lastRecurringBill = await getLastRecurringBill(createBill.id);

      if (lastRecurringBill === null) {
        recurringBill = await Models.recurring_billings.create({
          bill_id: createBill.id,
          period: requestData.recurringBilling.period,
          date_billed: `${recurringDate.getFullYear()}-${
            recurringDate.getMonth() + 2
          }-${recurringDate.getDate()}`,
          due_date: null,
        });
      } else {
        recurringBill = await Models.recurring_billings.update(
          {
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
        recurringDate: recurringBill.date_billed,
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

    const recurringDate = await getRecurringDate("Week", new Date());

    return {
      billId: createBill.id,
      paymentDetail: { transactionId: createTransaction.id, ...payBill },
      phoneNumber: requestData.phoneNumber,
      provider: requestData.provider,
      packageName: requestData.packageName ? requestData.packageName : null,
      description: requestData.description ? requestData.description : null,
      bill_fee: requestData.bill,
      admin_fee: requestData.adminFee,
      total: requestData.total,
      recurringDetail: recurringDate,
      message: "Payment Created",
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

const getRecurringDate = async (period, date) => {
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

    if (period === "Week") recurringDate = await getNextDayOfWeek(date, 2);

    return recurringDate;
  } catch (error) {
    return error.message;
  }
};

// const getNextDayOfWeek = async (date, dayOfWeek) => {
//   let resultDate = new Date(date.getTime());

//   let dayDiff = 2 - dayOfWeek;
//   dayDiff = dayDiff < 1 ? Math.abs(dayDiff) : dayDiff;

//   console.log(new Date().getDate());
//   console.log(dayDiff);
//   console.log(new Date().getDate() + dayDiff);
//   console.log(dayOfWeek);
//   console.log(new Date().getDate() + dayDiff + dayOfWeek + 1);

//   resultDate.setDate(new Date().getDate() + dayDiff + 7);

//   let result = `${resultDate.getFullYear()}-${resultDate.getMonth()}-${resultDate.getDate()}`;

//   console.log(result);

//   // console.log(dayDiff);

//   // await resultDate.setDate(
//   //   date.getDate() + ((7 + dayOfWeek - date.getDay() - 1) % 7) + 1
//   // );
//   return result;
// };
