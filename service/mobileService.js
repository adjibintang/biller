const Models = require("../database/models");
const paymentService = require("../service/paymentService");
const { Op } = require("sequelize");

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

exports.getPriceList = async (optionId, provider) => {
  try {
    const priceList = await Models.Option_prices.findAll({
      attributes: ["id", "provider", "package_name", "description"],
      where: {
        [Op.and]: [
          { option_id: optionId },
          { provider: provider ? providel : null },
        ],
      },
      include: { model: Models.Prices, attributes: ["price"] },
    });

    if (priceList.length === 0) return 204;

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
  optionId,
  userPin
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
      pin: userPin,
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

exports.newBill = async (requestData, userId, type) => {
  try {
    const createBill = await Models.bills.create({
      user_id: userId,
      bill_type: type,
    });

    const createMobileBill = await Models.mobile_bills.create({
      bill_id: createBill.id,
      phone_number: requestData.phoneNumber,
      provider: requestData.provider,
      package_name: requestData.packageName ? requestData.packageName : null,
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
    let recurringDate = await getRecurringDate(
      requestData.recurringBilling.period,
      new Date(requestData.recurringBilling.createDate),
      requestData.recurringBilling.day ? requestData.recurringBilling.day : null
    );

    if (requestData.recurringBilling.status === true) {
      const lastRecurringBill = await getLastRecurringBill(createBill.id);

      if (lastRecurringBill === null) {
        recurringBill = await Models.recurring_billings.create({
          bill_id: createBill.id,
          period: requestData.recurringBilling.period,
          date_billed: recurringDate,
          due_date: recurringDate,
        });
      } else {
        recurringBill = await Models.recurring_billings.update(
          {
            period: requestData.recurringBilling.period,
            date_billed: recurringDate,
            due_date: recurringDate,
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
      billId: createBill.id,
      paymentDetail: { transactionId: createTransaction.id, ...payBill },
      billDetail: {
        phoneNumber: requestData.phoneNumber,
        provider: requestData.provider,
        packageName: requestData.packageName ? requestData.packageName : null,
        description: requestData.description ? requestData.description : null,
        bill_fee: requestData.bill,
        admin_fee: requestData.adminFee,
        total: requestData.total,
      },
      recurringDetail: recurringDetail,
      message: "Payment Created",
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
        required: true,
        include: {
          attributes: [],
          model: Models.transactions,
          required: true,
          where: { status: "Success" },
        },
      },
    });

    return lastRecurringBill;
  } catch (error) {
    return error.message;
  }
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
