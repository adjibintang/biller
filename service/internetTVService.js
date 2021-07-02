const { Internet_tvs, Options } = require("../database/models");

exports.getOptions = async (service_id) => {
  let findOptions = await Options.findAll({ where: { service_id } });

  for (let i = 0; i < findOptions.length; i++) {
    findOptions[i] = { id: findOptions[i].id, option: findOptions[i].name };
  }

  return findOptions;
};

exports.getAccountInfo = async (customer_number) => {
  const accountInfo = await Internet_tvs.findOne({
    where: { customer_number },
  });

  return accountInfo;
};
