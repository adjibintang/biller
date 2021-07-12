const Models = require("../database/models");

exports.getAllService = async () => {
  try {
    const serviceResult = await Models.Services.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return serviceResult;
  } catch (error) {
    return error.message;
  }
};
