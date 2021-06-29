const { Electricities, Prices, Options, Option_prices } = require('../database/models');

exports.getTagihanAccInfo = async(idPel) => {
  const accInfo = await Electricities.findOne({
  where: {customer_number: idPel}
  });
  
  return accInfo;
};

exports.getElectricityOptions = async(serviceId, price) => {
  const electricityOptions = await Options.findAll({
    where: {service_id: serviceId},
    attributes: ['id', 'name']
  });
  return electricityOptions;
};

exports.getTokenPricelist = async(option_id) => {
  const tokenPricelist = await Option_prices.findAll({
    include: Prices,
    where: {option_id: option_id}
  });
  const prices = tokenPricelist.map((x) => x.dataValues.Price);
  for (let i= 0; i < prices.length; i++) {
    prices[i] = { id: prices[i].id, price: prices[i].price};
    };

  return prices;
};

exports.getTokenAccInfo = async(nomorMeter) => {
  const accInfo = await Electricities.findOne({
    where: {meter_number: nomorMeter}
  });
  
  return accInfo;
}


