const { Landlines } = require('../database/models');
const routes = {};

routes.getLandlineAccInfo = async (req, res) => {
  try {
    const telephoneNumber = req.body.telnum;

    if(!telephoneNumber){
      res.status(400).json({
        statusText: "Bad Request",
        message: "Please input telephone number",
      });
    }

    const isLandlineExist = await Landlines.findOne({
        where: {telephone_number: telephoneNumber}
    });

    if(!isLandlineExist){
      res.status(404).json({
        statusText: "Not Found",
        message: "Telephone number not registered"
      }); 
    } else {
      res.status(200).json({
        statusText: "OK",
        message: "Landline Confirmed",
        data: isLandlineExist
      });
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
};

module.exports = routes;