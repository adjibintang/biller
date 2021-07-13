const homeService = require("../service/homeService");

exports.getAllService = async (req, res) => {
  try {
    const getservice = await homeService.getAllService();

    const respayload = {
      statusText: "Ok",
      message: "Success Get Services",
      result: getservice,
    };
    res.status(200).json(respayload);
  } catch (error) {
    return res.sendStatus(500);
  }
};
