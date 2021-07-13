const Models = require("../database/models");

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
