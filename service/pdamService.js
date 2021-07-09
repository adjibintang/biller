const Models = require("../database/models");
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
    const accountInfo = await Models.Pdams.findOne({
      attributes: { exclude: ["createdAt", "updatedAt", "city_id"] },
      include: {
        model: Models.Cities,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      where: { customer_number: customerNumber },
    });

    if (accountInfo === null) return null;

    let usage =
      accountInfo.this_month_stand_meter - accountInfo.last_month_stand_meter;
    let bill =
      usage * parseFloat(accountInfo.fixed_cost) +
      parseFloat(accountInfo.stand_meter_maintenance_cost);
    let total = bill + 2500;

    const accountInfoResponse = {
      id: accountInfo.id,
      customerNumber: accountInfo.customer_number,
      name: accountInfo.name,
      period: `${new Date().getMonth() - 1}/${new Date().getFullYear()}`,
      lastMonthStandMeter: accountInfo.last_month_stand_meter,
      thisMonthStandMeter: accountInfo.this_month_stand_meter,
      usage: usage,
      bill: bill,
      admin: 2500,
      total: total,
    };

    return accountInfoResponse;
  } catch (error) {
    return error.message;
  }
};
