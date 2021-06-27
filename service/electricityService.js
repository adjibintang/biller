const { Electricities, Prices, Options, Option_prices } = require('../database/models');

exports.getTagihanAccInfo = async(idPel) => {
  const accInfo = await Electricities.findOne({
  where: {customer_number: idPel}
  });
  
  return accInfo;
};

exports.getElectricityOptions = async(serviceId) => {
  const electricityOptions = await Options.findAll({
    where: {service_id: serviceId}
  });
  const options = electricityOptions.map((x) => x.dataValues.name);
  return options;
};

exports.getTokenPricelist = async(option_id) => {
  const tokenPricelist = await Option_prices.findAll({
    include: Prices,
    where: {option_id: option_id}
  });
  const prices = tokenPricelist.map((x) => x.dataValues.Price);
  const list = prices.map((x)=> x.dataValues.price);
  return list;
};

exports.getTokenAccInfo = async(nomorMeter) => {
  const accInfo = await Electricities.findOne({
    where: {meter_number: nomorMeter}
  });
  return accInfo;
}


