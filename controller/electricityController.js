const { Electricities, Users, Services, Options, Prices } = require('../database/models');
const routes = {};
const { Op } = require('sequelize');

routes.getTagihanAccInfo = async (req, res) => {
  try {
    const idPel = req.body.id
    // const {serviceId, optionsId} = req.params

    if(!idPel) {
        res.status(400).json({
          statusText: "Bad Request",
          message: "IDPEL not Found",
        });
      } 

    const isIdPelExist = await Electricities.findOne({
        where: {customer_number: idPel}
    });

    if(!isIdPelExist){
      res.status(404).json({
          statusText: "Not Found",
          message: "Incorrect IDPEL"
      });      
    } else {
      res.status(200).json({
        statusText: "OK",
        message: "IDPEL Confirmed",
        data: isIdPelExist
      });
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  };
};

routes.getElectricityOptions = async (req, res) => {
  try {
    const serviceId = req.params.id;

    const electricityOptions = await Services.findAll({
      include: Options,
      where: {id: serviceId}
    });

    res.status(200).json({
      statusText: "OK",
      message: "Electricity Options",
      data: electricityOptions
    });
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  };
};

routes.getTokenPricelist = async (req, res) => {
  try {
    const {serviceId, optionsId} = req.query;
    if(serviceId == 1 && optionsId == 1){
      const tokenPricelist = await Prices.findAll();

      res.status(200).json({
        statusText: "OK",
        message: "Token Pricelist",
        data: tokenPricelist
      });
    } else {
      res.status(400).json({
        statusText: "Bad Request",
        message: "",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
};

routes.getTokenAccInfo = async (req, res) => {
  try {
    const nomorMeter = req.body.no
    console.log("🦄 ~ file: electricityBill.js ~ line 91 ~ routes.getTokenAccInfo= ~ nomorMeter", nomorMeter)
    // const {serviceId, optionsId} = req.params

    if(!nomorMeter) {
        res.status(400).json({
          statusText: "Bad Request",
          message: "Please input nomor meter",
        });
      } 

    const isNoMeter = await Electricities.findOne({
        where: {meter_number: nomorMeter}
    });

    if(!isNoMeter){
      res.status(404).json({
          statusText: "Not Found",
          message: "Number not registered"
      });      
    } else {
      res.status(200).json({
        statusText: "OK",
        message: "Nomor Meter Confirmed",
        data: isNoMeter
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

