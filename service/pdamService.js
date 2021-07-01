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
    const accountInfoResponse = await Models.Pdams.findOne({
      attributes: { exclude: ["createdAt", "updatedAt", "city_id"] },
      include: {
        model: Models.Cities,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      where: { customer_number: customerNumber },
    });

    return accountInfoResponse;
  } catch (error) {
    return error.message;
  }
};
