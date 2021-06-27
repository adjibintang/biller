const { Internet_tvs, Options } = require("../database/models");

exports.getOptions = async (service_id) => {
  const findOptions = await Options.findAll({ where: { service_id } });

  const options = findOptions.map((x) => x.dataValues.name);

  return options;
};

exports.getAccountInfo = async (customer_number) => {
  const accountInfo = await Internet_tvs.findOne({
    where: { customer_number },
  });

  return accountInfo;
};
