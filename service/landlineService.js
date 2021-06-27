const { Landlines } = require('../database/models');

exports.getAccInfo = async(telephoneNumber) => {
  const accInfo = await Landlines.findOne({
    where: {telephone_number: telephoneNumber}
  });
  return accInfo;
}